import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import uk from 'javascript-time-ago/locale/uk';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(uk);

export const timeAgo = new TimeAgo(localStorage.getItem('locale') || 'en-GB');
