import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './services/news/news.service';
import { Section } from './interfaces/news/section.interface';

@Controller('sections')
export class SectionsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getAllSections(): Promise<Section[]> {
    return this.newsService.getAllSections();
  }

  @Get(':name')
  async getSectionById(): Promise<Section[]> {
    return this.newsService.getSectionById();
  }

  @Get(':section')
  async getNewsBySection(@Param('section') section: string) {
    return this.newsService.getNewsBySection(section);
  }
}
