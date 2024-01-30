import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query, Patch,
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
  async findByAuthor(@Query('author') author: string) {
    return this.newsService.findByAuthor(author);
  }
  @Get('search/:query')
  async findByTitleOrAuthor(@Param('query') query: string) {
    return await this.newsService.findByTitleOrAuthor(query);
  }

  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @Post()
  async create(@Body() createNewsDto: NewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Patch(':_id')
  async update(@Param('_id') id: string, @Body() updateNewsDto: NewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':_id')
  async delete(@Param('_id') id: string) {
    return this.newsService.delete(id);
  }
}
