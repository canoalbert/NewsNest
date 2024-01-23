import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from '../../interfaces/news/news.interface';
import { NewsDto } from '../../dto/news.dto/news.dto';

@Injectable()
export class NewsService {
  private newsDto: NewsDto;

  constructor(@InjectModel('News') private newsModel: Model<News>) {}

  /*FindById*/
  async findById(id: string): Promise<News> {
    const news = await this.newsModel.findById(id).exec();
    if (!news) {
      throw new NotFoundException('Noticia no encontrada con ese Id');
    }
    return news;
  }

  /*FindByAuthorOrTitle*/
  async findByTitleOrAuthor(query: string): Promise<News[]> {
    const news = await this.newsModel
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } },
        ],
      })
      .exec();
    return news;
  }

  /*FindAll*/
  async findAll(): Promise<News[]> {
    return this.newsModel.find().exec();
  }

  /*Create/Insert*/
  async create(newsDto: NewsDto): Promise<News> {
    this.newsDto = newsDto;
    const news = new this.newsModel(newsDto);
    return news.save();
  }

  /*Update*/
  async update(id: string, updateNewsDto: NewsDto): Promise<News> {
    const news = await this.newsModel
      .findByIdAndUpdate(id, updateNewsDto, { new: true })
      .exec();
    if (!news) {
      throw new NotFoundException('Noticia no encontrada con ese Id');
    }
    return news;
  }

  /*Delete*/
  async delete(id: string): Promise<void> {
    const result = await this.newsModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Noticia no encontrada con ese Id');
    }
  }

  /*AllSections*/
  async getAllSections(): Promise<string[]> {
    const sections = await this.newsModel.distinct('section.name').exec();
    return sections.map((section: any) => section as string);
  }

  /*NewsBySection*/
  async getNewsBySection(section: string): Promise<News[]> {
    return this.newsModel.find({ section }).exec();
  }
}
