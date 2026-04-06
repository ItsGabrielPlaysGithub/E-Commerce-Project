import { Module } from '@nestjs/common';
import { CmsResolver } from './cms.resolver';
import { CmsService } from './cms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavBarTbl } from './entities/nav-bar-tbl';
import { NavLinksTbl } from './entities/nav-links-tbl';
import { NavBarService } from './all-contents/nav-bar';
import { CategoriesTbl } from './entities/categories-tbl';
import { TiktokCarouselsTbl } from './entities/tiktok-carousels-tbl';
import { TiktokVideosTbl } from './entities/tiktok-videos-tbl';
import { CategoriesService } from './all-contents/categories';
import { TiktokCarouselService } from './all-contents/tiktok-carousel';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NavBarTbl,
      NavLinksTbl,
      CategoriesTbl,
      TiktokCarouselsTbl,
      TiktokVideosTbl,
    ]),
  ],
  providers: [
    CmsResolver,
    CmsService,
    NavBarService,
    CategoriesService,
    TiktokCarouselService,
  ],
})
export class CmsModule {}
