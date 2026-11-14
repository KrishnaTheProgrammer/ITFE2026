import { Injectable, computed, signal } from '@angular/core';
import { CultureBadge, Episode } from '../models/series.models';

@Injectable({ providedIn: 'root' })
export class SeriesService {
  readonly episodes: Episode[] = [
    {
      number: 1,
      title: 'What Comes To Your Mind When You Hear India?',
      flag: '🇮🇪',
      country: 'Ireland',
      status: 'Coming Soon',
      duration: '14 min',
      location: 'Dublin & Galway, Ireland',
      synopsis:
        'Unfiltered street reactions across Ireland as locals share the very first images, stories, and emotions that come to mind when they hear the word India.',
      highlights: [
        'Spontaneous word-association responses on Grafton Street',
        'Shared cultural warmth and hospitality parallels',
        'Curiosity around Indian festivals and regional diversity'
      ]
    },
    {
      number: 2,
      title: 'India Beyond Stereotypes',
      flag: '🇬🇧',
      country: 'United Kingdom',
      status: 'Upcoming',
      duration: '16 min',
      location: 'London & Manchester, UK',
      synopsis:
        'A candid look at how modern Britain perceives contemporary India—moving past historical clichés toward today’s innovation, art, and everyday life.',
      highlights: [
        'Generational shifts in how India is viewed in the UK',
        'How British-Indian friendships reshape assumptions',
        'Surprising facts that challenge mainstream narratives'
      ]
    },
    {
      number: 3,
      title: 'First Impressions of India',
      flag: '🇫🇷',
      country: 'France',
      status: 'Upcoming',
      duration: '15 min',
      location: 'Paris & Lyon, France',
      synopsis:
        'From sensory memories of vibrant colors and cinema to philosophical curiosity, French passersby reflect on their first impressions of India.',
      highlights: [
        'Art, architecture, and aesthetic impressions',
        'Travelers recounting their first landing in New Delhi and Jaipur',
        'What Parisians wish they knew more about'
      ]
    },
    {
      number: 4,
      title: 'What Surprises People About India?',
      flag: '🇩🇪',
      country: 'Germany',
      status: 'Upcoming',
      duration: '15 min',
      location: 'Berlin & Munich, Germany',
      synopsis:
        'Conversations in Germany uncovering the contrasts that surprise people most—from India’s rapid digital transformation to centuries-old traditions.',
      highlights: [
        'Reactions to India’s scale, languages, and technology',
        'Contrast between expectations and lived experiences',
        'Thoughtful reflections on community and family life'
      ]
    },
    {
      number: 5,
      title: 'Questions Foreigners Want To Ask Indians',
      flag: '🇺🇸',
      country: 'USA',
      status: 'Upcoming',
      duration: '18 min',
      location: 'New York & Chicago, USA',
      synopsis:
        'Giving people in the United States the microphone to ask the honest, curious, and heartfelt questions they have always wanted to ask Indians.',
      highlights: [
        'Questions about daily life across 28 states',
        'Curiosity about regional cuisines beyond restaurant menus',
        'Open dialogue built on genuine respect'
      ]
    },
    {
      number: 6,
      title: 'India Through A Different Lens',
      flag: '🇯🇵',
      country: 'Japan',
      status: 'Upcoming',
      duration: '14 min',
      location: 'Tokyo & Kyoto, Japan',
      synopsis:
        'Exploring the subtle cultural threads connecting Japan and India—from ancient spiritual roots to modern mutual admiration.',
      highlights: [
        'Historical and philosophical connections between both nations',
        'Respect for craftsmanship, spirituality, and hospitality',
        'Stories from Japanese travelers who visited Varanasi and Kerala'
      ]
    },
    {
      number: 7,
      title: 'Culture, Food And Traditions',
      flag: '🇮🇹',
      country: 'Italy',
      status: 'Upcoming',
      duration: '15 min',
      location: 'Rome & Milan, Italy',
      synopsis:
        'Two cultures deeply passionate about family, heritage, and culinary craft come together in lively street conversations across Italy.',
      highlights: [
        'Comparing regional food pride in Italy and India',
        'Celebrations, weddings, and family traditions',
        'Why food is the fastest bridge between cultures'
      ]
    },
    {
      number: 8,
      title: 'Beyond What Media Shows',
      flag: '🇪🇸',
      country: 'Spain',
      status: 'Upcoming',
      duration: '13 min',
      location: 'Madrid & Barcelona, Spain',
      synopsis:
        'How headlines shape global perception—and what happens when people look beyond news cycles to discover human stories.',
      highlights: [
        'Recognizing gaps between news coverage and reality',
        'Music, dance, and human warmth as universal languages',
        'Personal encounters that changed perspectives'
      ]
    },
    {
      number: 9,
      title: "A Stranger's View Of India",
      flag: '🇨🇦',
      country: 'Canada',
      status: 'Upcoming',
      duration: '16 min',
      location: 'Toronto & Vancouver, Canada',
      synopsis:
        'In some of the world’s most multicultural neighborhoods, Canadians share how everyday interactions shape their view of India.',
      highlights: [
        'Neighborhood stories and cross-cultural friendships',
        'Festivals bringing communities together across Canada',
        'Reflections on identity and belonging'
      ]
    },
    {
      number: 10,
      title: 'India: Reality Vs Expectations',
      flag: '🇦🇺',
      country: 'Australia',
      status: 'Upcoming',
      duration: '17 min',
      location: 'Melbourne & Sydney, Australia',
      synopsis:
        'Australians compare what they expected before visiting India with the unforgettable realities they experienced on the ground.',
      highlights: [
        'Before-and-after travel stories from solo backpackers',
        'Beyond cricket: discovering India’s landscapes and people',
        'Lessons learned from stepping outside comfort zones'
      ]
    },
    {
      number: 11,
      title: 'The World Talks About India',
      flag: '🌎',
      country: 'Global',
      status: 'Upcoming',
      duration: '22 min',
      location: 'Season 1 Finale • Worldwide',
      synopsis:
        'The Season 1 finale weaving together voices from every continent into one shared mosaic of curiosity, empathy, and global perspective.',
      highlights: [
        'Highlights and unspoken truths from all 10 countries',
        'Common threads uniting how the world sees India',
        'A look ahead to Season 2 conversations'
      ]
    }
  ];

  readonly featuredCultures: CultureBadge[] = [
    { flag: '🇮🇪', country: 'Ireland', episodeCount: 1 },
    { flag: '🇬🇧', country: 'United Kingdom', episodeCount: 1 },
    { flag: '🇫🇷', country: 'France', episodeCount: 1 },
    { flag: '🇩🇪', country: 'Germany', episodeCount: 1 },
    { flag: '🇺🇸', country: 'USA', episodeCount: 1 },
    { flag: '🇯🇵', country: 'Japan', episodeCount: 1 },
    { flag: '🇨🇦', country: 'Canada', episodeCount: 1 }
  ];

  private readonly selectedCountrySignal = signal<string | null>(null);
  private readonly activeEpisodeSignal = signal<Episode | null>(null);

  get selectedCountry(): string | null {
    return this.selectedCountrySignal();
  }

  get activeEpisode(): Episode | null {
    return this.activeEpisodeSignal();
  }

  get filteredEpisodes(): Episode[] {
    const country = this.selectedCountrySignal();
    if (!country) {
      return this.episodes;
    }
    return this.episodes.filter((ep) => ep.country === country);
  }

  setSelectedCountry(country: string | null): void {
    this.selectedCountrySignal.set(country);
  }

  clearCountryFilter(): void {
    this.selectedCountrySignal.set(null);
  }

  openEpisodePreview(episode: Episode): void {
    this.activeEpisodeSignal.set(episode);
  }

  closeEpisodePreview(): void {
    this.activeEpisodeSignal.set(null);
  }
}