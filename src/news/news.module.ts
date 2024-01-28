import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './services/news/news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './schemas/news.schema/news.schema';
import { SectionsController } from './sections.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'News',
        schema: NewsSchema,
        collection: 'news2324',
      },
    ]),
  ],
  controllers: [NewsController, SectionsController],
  providers: [NewsService],
})
export class NewsModule {}
