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
  @Get(':_id')
  async findById(@Param('_id') id: string) {
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

  @Put(':_id')
  async update(@Param('_id') id: string, @Body() updateNewsDto: NewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':_id')
  async delete(@Param('_id') id: string) {
    return this.newsService.delete(id);
  }
}
