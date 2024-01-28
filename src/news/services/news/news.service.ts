import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from '../../interfaces/news/news.interface';
import { NewsDto } from '../../dto/news.dto/news.dto';
import { Section } from '../../interfaces/news/section.interface';

@Injectable()
export class NewsService {
  private newsDto: NewsDto;

  constructor(@InjectModel('News') private newsModel: Model<News>) {}

  /*FindById*/
  async findById(_id: string): Promise<News> {
    const news = await this.newsModel.findById(_id).exec();
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
  async update(_id: string, updateNewsDto: NewsDto): Promise<News> {
    const news = await this.newsModel
      .findByIdAndUpdate(_id, updateNewsDto, { new: true })
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

  async getAllSections(): Promise<Section[]> {
    return this.newsModel.find().distinct('section').exec();
  }

  async getNewsBySection(section: string): Promise<News[]> {
    return this.newsModel.find({ section }).exec();
  }

  getSectionById() {
    return [];
  }
}
