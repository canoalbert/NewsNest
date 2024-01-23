import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { NewsDto } from './dto/news.dto/news.dto';
import { NewsService } from './services/news/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.newsService.findById(id);
  }

  @Get('search')
  async findByTitleOrAuthor(@Query('query') query: string) {
    return this.newsService.findByTitleOrAuthor(query);
  }

  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @Post()
  async create(@Body() createNewsDto: NewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNewsDto: NewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.newsService.delete(id);
  }

  @Get('sections')
  async getAllSections() {
    return this.newsService.getAllSections();
  }

  @Get('sections/:section')
  async getNewsBySection(@Param('section') section: string) {
    return this.newsService.getNewsBySection(section);
  }
}
