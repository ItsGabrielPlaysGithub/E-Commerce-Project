import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

interface PaymentIntentPayload {
  amount: number; // in centavos (cents)
  currency: string;
  description?: string;
  statementDescriptor?: string;
  payment_method_allowed: string[]; // Array of allowed payment methods
  redirect?: {
    success: string;
    failed: string;
  };
}

interface PaymentIntentResponse {
  id: string;
  type: string;
  attributes: {
    amount: number;
    status: string;
    currency: string;
    description: string;
    statementDescriptor: string;
    createdAt: string;
    updatedAt: string;
    clientKey: string;
    paymentMethodWhitelist: string[];
    paymentMethodBlacklist: string[];
    nextAction: {
      type: string;
      redirect: {
        url: string;
      };
    };
  };
}

@Injectable()
export class PaymongoService {
  private readonly logger = new Logger(PaymongoService.name);
  private readonly client: AxiosInstance;
  private readonly secretKey: string;
  private readonly publicKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get<string>('PAYMONGO_SECRET_KEY') || '';
    this.publicKey = this.configService.get<string>('PAYMONGO_PUBLIC_KEY') || '';
    const apiUrl = this.configService.get<string>('PAYMONGO_API_URL') || 'https://api.paymongo.com/v1';

    // Create axios instance with Base64 authentication
    const encodedKey = Buffer.from(`${this.secretKey}:`).toString('base64');

    this.client = axios.create({
      baseURL: apiUrl,
      headers: {
        'Authorization': `Basic ${encodedKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  /**
   * Create a Checkout Link with PayMongo (for hosted checkout)
   * @param amount - Amount in PHP (will be converted to centavos)
   * @param orderId - Reference order ID
   * @param description - Payment description
   * @returns Checkout Link with URL
   */
  async createCheckoutLink(
    amount: number,
    orderId: number,
    description?: string,
  ): Promise<{
    checkoutId: string;
    checkoutUrl: string;
    status: string;
  }> {
    try {
      this.logger.debug(`createCheckoutLink called with: amount=${amount}, orderId=${orderId}, description=${description}`);

      const amountInCentavos = Math.round(amount * 100);

      if (!amount || amount <= 0 || isNaN(amount)) {
        throw new Error(`Invalid amount: ${amount}`);
      }

      if (amountInCentavos <= 0 || isNaN(amountInCentavos)) {
        throw new Error(`Invalid amount in centavos: ${amountInCentavos}`);
      }

      const successUrl = this.configService.get<string>('PAYMONGO_CHECKOUT_SUCCESS_URL') || 'http://localhost:3000/checkout/success';
      const failedUrl = this.configService.get<string>('PAYMONGO_CHECKOUT_FAILED_URL') || 'http://localhost:3000/checkout/failed';

      const payload = {
        data: {
          attributes: {
            description: description || `Order #${orderId}`,
            payment_method_types: ['card', 'paymaya', 'gcash'],
            line_items: [
              {
                amount: amountInCentavos,
                currency: 'PHP',
                name: description || `Order #${orderId}`,
                description: description || `Order #${orderId}`,
                quantity: 1,
              },
            ],
            success_url: `${successUrl}?orderId=${orderId}`,
            cancel_url: `${failedUrl}?orderId=${orderId}`,
            show_line_items: true,
          },
        },
      };

      this.logger.debug(`PayMongo Checkout Link Request: ${JSON.stringify(payload)}`);

      const response = await this.client.post<{ data: any }>(
        '/checkout_sessions',
        payload,
      );

      const data = response.data.data;
      const checkoutUrl = data.attributes?.checkout_url || '';

      this.logger.debug(`Full Checkout Link Response: ${JSON.stringify(response.data)}`);
      this.logger.debug(`Checkout URL: ${checkoutUrl}`);

      if (!checkoutUrl) {
        this.logger.error(`No checkout URL in response: ${JSON.stringify(data.attributes)}`);
        throw new Error('Failed to get checkout URL from PayMongo');
      }

      this.logger.log(`Checkout Link created: ${data.id} for Order #${orderId}`);

      return {
        checkoutId: data.id,
        checkoutUrl,
        status: data.attributes?.status || 'pending',
      };
    } catch (error) {
      this.logger.error(
        `Failed to create Checkout Link for Order #${orderId}:`,
        error instanceof Error ? error.message : String(error),
      );

      if (error instanceof Error && 'response' in error) {
        const axiosError = error as any;
        this.logger.error(`PayMongo API Error Response: ${JSON.stringify(axiosError.response?.data)}`);
      }

      throw new Error(
        `PayMongo: Failed to create checkout link - ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * Create a Payment Intent with PayMongo
   * @param amount - Amount in PHP (will be converted to centavos)
   * @param orderId - Reference order ID
   * @param description - Payment description
   * @returns Payment Intent with checkout URL
   */
  async createPaymentIntent(
    amount: number,
    orderId: number,
    description?: string,
  ): Promise<{
    paymentIntentId: string;
    checkoutUrl: string;
    status: string;
  }> {
    try {
      // Debug: log input parameters
      this.logger.debug(`createPaymentIntent called with: amount=${amount}, orderId=${orderId}, description=${description}`);

      const amountInCentavos = Math.round(amount * 100); // Convert PHP to centavos
      
      // Validate amount
      if (!amount || amount <= 0 || isNaN(amount)) {
        throw new Error(`Invalid amount: ${amount}`);
      }

      if (amountInCentavos <= 0 || isNaN(amountInCentavos)) {
        throw new Error(`Invalid amount in centavos: ${amountInCentavos}`);
      }

      const successUrl = this.configService.get<string>('PAYMONGO_CHECKOUT_SUCCESS_URL') || 'http://localhost:3000/checkout/success';
      const failedUrl = this.configService.get<string>('PAYMONGO_CHECKOUT_FAILED_URL') || 'http://localhost:3000/checkout/failed';

      const payload: PaymentIntentPayload = {
        amount: amountInCentavos,
        currency: 'PHP',
        description: description || `Order #${orderId}`,
        statementDescriptor: `ORDER-${orderId}`,
        // PayMongo requires specifying allowed payment methods (only these are valid)
        payment_method_allowed: ['card', 'paymaya', 'gcash'],
        redirect: {
          success: `${successUrl}?orderId=${orderId}`,
          failed: `${failedUrl}?orderId=${orderId}`,
        },
      };

      // Debug: log the exact payload being sent
      this.logger.debug(`PayMongo API Request Payload: ${JSON.stringify(payload)}`);

      // Wrap payload in data.attributes structure as required by PayMongo API
      const wrappedPayload = {
        data: {
          attributes: payload,
        },
      };

      this.logger.debug(`PayMongo API Wrapped Payload: ${JSON.stringify(wrappedPayload)}`);

      const response = await this.client.post<{ data: PaymentIntentResponse }>(
        '/payment_intents',
        wrappedPayload,
      );

      const data = response.data.data;
      const checkoutUrl = data.attributes.nextAction?.redirect?.url || '';

      this.logger.log(
        `Payment Intent created: ${data.id} for Order #${orderId}, Amount: ₱${amount}`,
      );

      // Debug: log full response structure
      this.logger.debug(`Full PayMongo Response: ${JSON.stringify(response.data)}`);
      this.logger.debug(`Extracted data: ${JSON.stringify(data)}`);
      this.logger.debug(`Checkout URL: ${checkoutUrl}`);

      if (!checkoutUrl) {
        this.logger.error(`No checkout URL found in PayMongo response. nextAction: ${JSON.stringify(data.attributes.nextAction)}`);
      }

      return {
        paymentIntentId: data.id,
        checkoutUrl,
        status: data.attributes.status,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create Payment Intent for Order #${orderId}:`,
        error instanceof Error ? error.message : String(error),
      );
      // Log the full error response if it's an axios error
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as any;
        this.logger.error(`PayMongo API Response: ${JSON.stringify(axiosError.response?.data)}`);
      }
      throw new Error(
        `PayMongo: Failed to create payment intent - ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * Retrieve a Payment Intent by ID
   * @param paymentIntentId - PayMongo Payment Intent ID
   * @returns Payment Intent details
   */
  async retrievePaymentIntent(paymentIntentId: string): Promise<{
    status: string;
    amount: number;
    amountInPhp: number;
    description: string;
  }> {
    try {
      const response = await this.client.get<{ data: PaymentIntentResponse }>(
        `/payment_intents/${paymentIntentId}`,
      );

      const data = response.data.data;

      this.logger.log(`Retrieved Payment Intent: ${paymentIntentId}, Status: ${data.attributes.status}`);

      return {
        status: data.attributes.status,
        amount: data.attributes.amount,
        amountInPhp: data.attributes.amount / 100,
        description: data.attributes.description,
      };
    } catch (error) {
      this.logger.error(
        `Failed to retrieve Payment Intent ${paymentIntentId}:`,
        error instanceof Error ? error.message : String(error),
      );
      throw new Error(
        `PayMongo: Failed to retrieve payment intent - ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * Get public key for frontend
   * Used for client-side payment processing if needed
   */
  getPublicKey(): string {
    return this.publicKey;
  }

  /**
   * Check if PayMongo is properly configured
   */
  isConfigured(): boolean {
    return !!(this.secretKey && this.publicKey);
  }
}
