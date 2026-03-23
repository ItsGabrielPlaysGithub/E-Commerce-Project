"use client";

import { InquiryHeader, InquirySidebar, InquiryForm, InquirySuccess } from "./components";
import { useInquiryForm } from "./hooks/useInquiryForm";

export function Inquiry() {
  const { form, setField, submitted, loading, handleSubmit, reset } = useInquiryForm();

  if (submitted) {
    return <InquirySuccess form={form} onReset={reset} />;
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <InquiryHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <InquirySidebar />
        <InquiryForm
          form={form}
          loading={loading}
          onFieldChange={setField}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
