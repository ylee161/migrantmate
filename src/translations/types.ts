export type LanguageCode = 'en' | 'zh' | 'ms' | 'ta' | 'bn' | 'hi' | 'th' | 'vi' | 'id' | 'tl' | 'my';

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}

export interface Translation {
  code: LanguageCode;
  name: string;
  flag: string;
  content: TranslationContent;
}

export interface TranslationContent {
  title: string;
  subtitle: string;
  description: string;
  menuTitle: string;
  needHelpTitle: string;
  needHelpDescription: string;
  activitiesTitle: string;
  activitiesDescription: string;
  chatbotTitle: string;
  chatbotDescription: string;
  charitiesTitle: string;
  charitiesDescription: string;
  backButton: string;
  clickToGetHelp: string;
  clickToExpand: string;
  categories: Categories;
  helpCategories: HelpCategories;
  activities: Activities;
  discounts: Discounts;
  howItWorks: HowItWorks;
  footer: string;
}

export interface Categories {
  financial: string;
  food: string;
  housing: string;
  legal: string;
  travel: string;
  health: string;
}

export interface HelpCategories {
  financial: CategoryItems;
  food: CategoryItems;
  housing: CategoryItems;
  legal: CategoryItems;
  travel: CategoryItems;
  health: CategoryItems;
}

export interface CategoryItems {
  [key: string]: {
    title: string;
    description: string;
  };
}

export interface Activities {
  title: string;
  subtitle: string;
  socialActivities: {
    title: string;
    description: string;
  };
  communityEvents: {
    title: string;
    description: string;
  };
  discountsNearYou: {
    title: string;
    description: string;
  };
  foodShare: {
    title: string;
    description: string;
  };
  volunteer: {
    title: string;
    description: string;
  };
  learning: {
    title: string;
    description: string;
  };
  sports: {
    title: string;
    description: string;
  };
  foodPlaces?: {
    title: string;
    description: string;
  };
  shoppingPlaces?: {
    title: string;
    description: string;
  };
}

export interface Discounts {
  pageTitle: string;
  subtitle: string;
  categories: {
    all: string;
    food: string;
    shopping: string;
    entertainment: string;
    services: string;
    transportation: string;
  };
  labels: {
    distance: string;
    validUntil: string;
    discount: string;
    terms: string;
    location: string;
    contact: string;
    viewDetails: string;
    getDirections: string;
    refreshLocation: string;
    nearbyDiscounts: string;
    noDiscounts: string;
    loadingLocation: string;
    locationError: string;
  };
}

export interface HowItWorks {
  title: string;
  description: string;
  steps: string[];
}
