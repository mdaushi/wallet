import i18n from 'i18n-js';
import { enUS, ru, id } from 'date-fns/locale';
import {
  addSeconds,
  differenceInCalendarMonths,
  differenceInYears,
  format as dateFnsFormat,
  formatDistanceStrict,
  parse as dateFnsParse,
  startOfToday,
  startOfYesterday,
} from 'date-fns';

import { t } from '$translation/helper';
import {capitalizeFirstLetter} from "$utils/string";

const dateFnsLocale: Record<string, any> = {
  ru,
  id,
  en: enUS,
};

export const getLocale = () => {
  const locale = i18n.currentLocale();
  return dateFnsLocale[locale] ?? enUS;
};

export const format = (date: number | Date, formatString: string, options?: any) =>
  dateFnsFormat(date, formatString, {
    locale: getLocale(),
    ...options,
  });

export const parse = (dateString: string, formatString: string, fallbackDate: Date) =>
  dateFnsParse(dateString, formatString, fallbackDate, {
    locale: getLocale(),
  });

export function formatDate(date: Date) {
  const now = new Date();
  const dateString = format(date, 'dd MM yyyy');

  if (dateString === format(startOfToday(), 'dd MM yyyy')) {
    return t('today');
  } else if (dateString === format(startOfYesterday(), 'dd MM yyyy')) {
    return t('yesterday');
  } else {
    if (differenceInCalendarMonths(now, date) < 1) {
      return format(date, 'd MMMM', {
        locale: getLocale(),
      });
    } else if (differenceInYears(now, date) < 1) {
      return capitalizeFirstLetter(
        format(date, 'LLLL', {
          locale: getLocale(),
        }),
      );
    } else {
      return capitalizeFirstLetter(
        format(date, 'LLLL yyyy', {
          locale: getLocale(),
        }),
      );
    }
  }
}

const days = (daysCount: number = 1) => 86400 * daysCount;

export function formatSubscriptionPeriod(intervalSec: number) {
  if (
    intervalSec === days(30 * 12) ||
    (intervalSec >= days(365) && intervalSec <= days(366))
  ) {
    return t('subscription_period_year');
  } else if (intervalSec === days(30 * 6)) {
    return t('subscription_period_half_year');
  } else if (intervalSec === days(30 * 3)) {
    return t('subscription_period_quarter');
  } else if (intervalSec === days(30) || intervalSec === days(30.4375)) {
    // 30.4375 == 365.25/12
    return t('subscription_period_month');
  } else if (intervalSec === days(7)) {
    return t('subscription_period_week');
  } else if (intervalSec && intervalSec % days(7) === 0) {
    // every N weeks
    const countWeeks = intervalSec / days(7);
    return t('subscription_period_weeks', { count: countWeeks });
  } else if (intervalSec === days(1)) {
    return t('subscription_period_day');
  } else if (intervalSec === 3600) {
    return t('subscription_period_hour');
  } else {
    const startDate = new Date();
    const endDate = addSeconds(startDate, intervalSec);
    return t('subscription_period_custom', {
      period: formatDistanceStrict(endDate, startDate, {
        addSuffix: false,
        locale: getLocale(),
      }),
    });
  }
}
