import { Link, useParams } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { navbarCategories, slugifyCategory } from '../data/categoryTree';

import bathAndHandwashImg from '../assets/bath and handwash.png';
import feminineHygieneImg from '../assets/Feminine Hygiene1.png';
import fragrancesDeosImg from '../assets/Fragrances & Deos1.png';
import haircareImg from '../assets/Hair Care1.png';
import makeupImg from '../assets/Makeup1.png';
import oralCareImg from '../assets/oral care1.png';
import skinCareImg from '../assets/skin care1.png';

const imageBySlug = {
  'bath-and-hand-wash': bathAndHandwashImg,
  'feminine-hygiene': feminineHygieneImg,
  'fragrances-and-deos': fragrancesDeosImg,
  'hair-care': haircareImg,
  makeup: makeupImg,
  'oral-care': oralCareImg,
  'skin-care': skinCareImg,
};

const ALL_PATH = '/category/beauty-and-hygiene';

const itemClass = (active) =>
  `relative flex flex-col items-center gap-1.5 px-1.5 py-2.5 text-center shrink-0 ${
    active ? 'bg-canvas' : 'bg-white'
  }`;

const CategoryRail = () => {
  const { categoryName, subCategoryName } = useParams();
  const currentSlug = slugifyCategory(subCategoryName || '');
  const isAllActive = !subCategoryName && slugifyCategory(categoryName || '') === 'beauty-and-hygiene';

  return (
    <aside
      aria-label="Categories"
      className="fixed left-0 z-40 w-[4.75rem] overflow-y-auto overflow-x-hidden overscroll-contain border-r border-line bg-white scrollbar-hide sm:w-[5.5rem]"
      style={{
        top: 'var(--app-header-height, 72px)',
        bottom: 0,
      }}
    >
      <nav className="flex flex-col pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] lg:pb-3">
        <Link to={ALL_PATH} className={itemClass(isAllActive)}>
          {isAllActive && <span className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-accent" />}
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${
              isAllActive ? 'bg-white shadow-sm ring-1 ring-accent/20' : 'bg-canvas'
            }`}
          >
            <LayoutGrid className={`h-[18px] w-[18px] ${isAllActive ? 'text-accent' : 'text-muted'}`} strokeWidth={1.7} />
          </span>
          <span
            className={`w-full text-[10px] leading-tight ${
              isAllActive ? 'font-semibold text-ink' : 'font-medium text-muted'
            }`}
          >
            All
          </span>
        </Link>

        {navbarCategories.map((category) => {
          const slug = category.slug || slugifyCategory(category.name);
          const active = currentSlug === slug;

          return (
            <Link key={category.path} to={category.path} className={itemClass(active)}>
              {active && <span className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-accent" />}
              <span
                className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl sm:h-12 sm:w-12 ${
                  active ? 'bg-white shadow-sm ring-1 ring-accent/20' : 'bg-canvas'
                }`}
              >
                <img src={imageBySlug[slug]} alt="" className="h-[78%] w-[78%] object-contain" />
              </span>
              <span
                className={`w-full px-0.5 text-[10px] leading-tight line-clamp-2 ${
                  active ? 'font-semibold text-ink' : 'font-medium text-muted'
                }`}
              >
                {category.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default CategoryRail;
