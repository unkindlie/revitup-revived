import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Article } from 'features/articles/article.entity';
import { Event } from 'features/events/event.entity';
import { DisciplineEntity } from 'features/disciplines/discipline.entity';

type SearchItem = {
  type: 'article' | 'event' | 'discipline';
  id: string | number;
};

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
        .select(['a.id'])
        .where('a.deletedAt IS NULL')
        .andWhere(
          '(a.title ILIKE :q OR a.preview_text ILIKE :q OR a.text ILIKE :q)',
          {
            q,
          },
        )
        .getMany(),
      this.eventRepo
        .createQueryBuilder('e')
        .select(['e.id'])
        .where('(e.title ILIKE :q OR e.description ILIKE :q)', { q })
        .getMany(),
      this.disciplineRepo
        .createQueryBuilder('d')
        .select(['d.id'])
        .where('d.name ILIKE :q', { q })
        .getMany(),
    ]);

    const results: SearchItem[] = [];

    for (const a of articles)
      results.push({ type: 'article', id: (a as any).id });
    for (const e of events) results.push({ type: 'event', id: (e as any).id });
    for (const d of disciplines)
      results.push({ type: 'discipline', id: (d as any).id });

    return results;
  }
}
