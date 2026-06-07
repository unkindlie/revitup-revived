import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { search, fetchItems, type SearchResultItem } from '@/api/scopes/search';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Pages, path } from '@/lib/routing/client';
import { useTranslation } from '@/hooks/useTranslation';

const RECENT_KEY = 'recentSearches';

const storeRecent = (entry: { id: string | number; type: string }) => {
  const raw = localStorage.getItem(RECENT_KEY);
  const arr = raw
    ? (JSON.parse(raw) as Array<{ id: string | number; type: string }>)
    : [];
  const filtered = arr.filter(
    (a) => !(a.id === entry.id && a.type === entry.type),
  );
  filtered.unshift(entry);
  const sliced = filtered.slice(0, 10);
  localStorage.setItem(RECENT_KEY, JSON.stringify(sliced));
};

const loadRecent = (): Array<{ id: string | number; type: string }> => {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const removeRecent = (entry: { id: string | number; type: string }) => {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as Array<{ id: string | number; type: string }>;
    const filtered = arr.filter(
      (a) => !(a.id === entry.id && a.type === entry.type),
    );
    localStorage.setItem(RECENT_KEY, JSON.stringify(filtered));
    return filtered;
  } catch {
    return [];
  }
};

const clearAllRecent = () => {
  localStorage.removeItem(RECENT_KEY);
};

export const HeaderSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [recent, setRecent] = useState<SearchResultItem[]>([]);

  const { t } = useTranslation(['common']);

  useEffect(() => {
    const id = setTimeout(() => {
      if (query.trim() === '') return setResults([]);
      search(query)
        .then((res) => {
          if (res.response.data) setResults(res.response.data);
        })
        .catch(() => setResults([]));
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  const onOpen = async () => {
    const ids = loadRecent();

    console.log(loadRecent());

    if (ids.length === 0) return setRecent([]);
    try {
      const fetched = await fetchItems(ids);
      if (fetched.response.data) {
        setRecent(fetched.response.data);
      }
    } catch {
      setRecent([]);
    }
  };

  const onClickItem = (item: SearchResultItem) => {
    storeRecent({ id: item.id, type: item.type });
  };

  const onClearOne = (item: SearchResultItem) => {
    removeRecent({ id: item.id, type: item.type });
    setRecent((prev) =>
      prev.filter((p) => !(p.id === item.id && p.type === item.type)),
    );
  };

  const onClearAll = () => {
    clearAllRecent();
    setRecent([]);
  };

  const renderItem = (item: SearchResultItem) => {
    if (item.type === 'event') {
      return (
        <Link
          to={path(Pages.EventDetailed, { id: item.id })}
          className="flex items-center gap-3"
        >
          {item.mainImgUrl ? (
            <img src={item.mainImgUrl} className="h-12 w-12 rounded" />
          ) : (
            <div className="bg-muted-foreground h-12 w-12 rounded" />
          )}
          <div>
            <div className="font-semibold">{item.title}</div>
            <div className="text-muted-foreground text-sm">Event</div>
          </div>
        </Link>
      );
    }
    if (item.type === 'discipline') {
      return (
        <div className="flex items-center gap-3">
          {item.mainImgUrl ? (
            <img src={item.mainImgUrl} className="h-10 w-10 rounded-full" />
          ) : (
            <div className="bg-muted-foreground h-10 w-10 rounded-full" />
          )}
          <div>
            <div className="font-semibold">{item.title}</div>
            <div className="text-muted-foreground text-sm">Discipline</div>
          </div>
        </div>
      );
    }
    if (item.type === 'driver') {
      return (
        <Link
          to={path(Pages.DriverDetailed, { id: item.id })}
          className="flex items-center gap-3"
        >
          {item.mainImgUrl ? (
            <img
              src={item.mainImgUrl}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="bg-muted-foreground h-10 w-10 rounded-full" />
          )}
          <div>
            <div className="font-semibold">{item.title}</div>
            <div className="text-muted-foreground text-sm">Driver</div>
          </div>
        </Link>
      );
    }
    // article
    return (
      <Link
        to={path(Pages.ArticleDetailed, { id: item.id })}
        className="hover:bg-accent flex items-center gap-3 rounded-md px-3 py-1"
      >
        {item.mainImgUrl ? (
          <img
            src={item.mainImgUrl}
            className="h-10 w-16 rounded object-cover"
          />
        ) : (
          <div className="bg-muted-foreground h-10 w-16 rounded" />
        )}
        <div>
          <div className="font-semibold">{item.title}</div>
          <div className="text-muted-foreground text-sm">Article</div>
        </div>
      </Link>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={onOpen}>
        <FontAwesomeIcon
          icon={faSearch}
          className="cursor-pointer text-white"
        />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{t('components.search.title')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <input
            className="w-full rounded-md border p-2"
            placeholder={`${t('components.search.title')}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          {query.trim() === '' ? (
            <div>
              <div className="mb-2 flex items-center justify-between font-semibold">
                {t('components.search.recent')}
                <button
                  onClick={onClearAll}
                  className="text-muted-foreground hover:text-foreground ml-2 text-xs"
                >
                  {t('components.search.clearAll')}
                </button>
              </div>
              <div className="grid gap-2">
                {recent.map((r) => (
                  <div
                    key={`${r.type}-${r.id}`}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <DialogClose
                        asChild
                        onClick={() => onClickItem(r)}
                        className="w-full text-left"
                      >
                        {renderItem(r)}
                      </DialogClose>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearOne(r);
                      }}
                      aria-label="Clear recent"
                      className="text-muted-foreground hover:text-foreground ml-2 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              {results.map((r) => (
                <DialogClose
                  asChild
                  onClick={() => onClickItem(r)}
                  className="w-full text-left"
                  key={`${r.type}-${r.id}`}
                >
                  {renderItem(r)}
                </DialogClose>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeaderSearch;
