import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Article } from 'features/articles/article.entity';
import { Event } from 'features/events/event.entity';
import { DisciplineEntity } from 'features/disciplines/discipline.entity';

type SearchItem = {
  type: 'article' | 'event' | 'discipline';
  id: string | number;
  title?: string;
  mainImgUrl?: string | null;
};

// TODO: move it separately to the search repository
@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
    @InjectRepository(DisciplineEntity)
    private disciplineRepo: Repository<DisciplineEntity>,
  ) {}

  async search(query: string): Promise<SearchItem[]> {
    if (!query || query.trim() === '') return [];

    const q = `%${query.trim()}%`;

    const [articles, events, disciplines] = await Promise.all([
      this.articleRepo
        .createQueryBuilder('a')
        .select(['a.id', 'a.title', 'a.mainImgUrl'])
        .where('a.deleted_at IS NULL')
        .andWhere(
          '(a.title ILIKE :q OR a.preview_text ILIKE :q OR a.text ILIKE :q)',
          {
            q,
          },
        )
        .getMany(),
      this.eventRepo
        .createQueryBuilder('e')
        .select(['e.id', 'e.title', 'e.mainImgUrl'])
        .where('(e.title ILIKE :q OR e.description ILIKE :q)', { q })
        .getMany(),
      this.disciplineRepo
        .createQueryBuilder('d')
        .select(['d.id', 'd.title', 'd.mainImgUrl'])
        .where('d.title ILIKE :q', { q })
        .getMany(),
    ]);

    const results: SearchItem[] = [];

    for (const a of articles)
      results.push({
        type: 'article',
        id: a.id,
        title: a.title,
        mainImgUrl: a.mainImgUrl ?? null,
      });
    for (const e of events)
      results.push({
        type: 'event',
        id: e.id,
        title: e.title,
        mainImgUrl: e.mainImgUrl ?? null,
      });
    for (const d of disciplines)
      results.push({
        type: 'discipline',
        id: d.id,
        title: d.title,
        mainImgUrl: d.mainImgUrl ?? null,
      });

    return results;
  }

  async fetchItems(
    items: Array<{
      type: 'article' | 'event' | 'discipline';
      id: number;
    }>,
  ): Promise<SearchItem[]> {
    const results: SearchItem[] = [];

    await Promise.all(
      items.map(async (it) => {
        try {
          if (it.type === 'article') {
            const a = await this.articleRepo.findOne({
              select: {
                id: true,
                title: true,
                mainImgUrl: true,
              },
              where: { id: it.id },
            });
            if (a)
              results.push({
                type: 'article',
                id: a.id,
                title: a.title,
                mainImgUrl: a.mainImgUrl ?? null,
              });
          }
          if (it.type === 'event') {
            const e = await this.eventRepo.findOne({
              select: {
                id: true,
                title: true,
                mainImgUrl: true,
              },
              where: { id: it.id },
            });
            if (e)
              results.push({
                type: 'event',
                id: e.id,
                title: e.title,
                mainImgUrl: e.mainImgUrl ?? null,
              });
          }
          if (it.type === 'discipline') {
            const d = await this.disciplineRepo.findOne({
              select: {
                id: true,
                title: true,
                mainImgUrl: true,
              },
              where: { id: it.id },
            });
            if (d)
              results.push({
                type: 'discipline',
                id: d.id,
                title: d.title,
                mainImgUrl: d.mainImgUrl ?? null,
              });
          }
        } catch {
          // ignore missing
        }
      }),
    );

    return results;
  }
}
