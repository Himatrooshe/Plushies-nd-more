import {Link} from 'react-router';
import pluse1 from '~/assets/pluse-1.png?url';
import plush2 from '~/assets/pluse-2.png?url';
import plush3 from '~/assets/pluse-3.png?url';
import plush4 from '~/assets/pluse-4.png?url';
import plush5 from '~/assets/pluse-5.png?url';
import plush6 from '~/assets/pluse-6.png?url';
import plush7 from '~/assets/pluse-7.png?url';
import plush8 from '~/assets/pluse-8.png?url';
const categories = [
  {id: 'plush-stuffed', title: 'Plush & Stuffed Animals', image: pluse1, href: '/collections/plush-stuffed-animals'},
  {id: 'home-decor-gifts', title: 'Home Decor & Gifts', image: plush2, href: '/collections/home-decor-gifts'},
  {id: 'sensory-fidget', title: 'Sensory & Fidget', image: plush3, href: '/collections/sensory-fidget'},
  {id: 'interactive-toy', title: 'Interactive Toy', image: plush4, href: '/collections/interactive-toy'},
  {id: 'baby-nursery', title: 'Baby & Nursery', image: plush5, href: '/collections/baby-nursery'},
  {id: 'bath-bath-toys', title: 'Bath & Bath Toys', image: plush6, href: '/collections/bath-bath-toys'},
  {id: 'character-licensed', title: 'Character & Licensed', image: plush7, href: '/collections/character-licensed'},
  {id: 'bath-bath-toys-2', title: 'Bath & Bath Toys', image: plush8, href: '/collections/bath-bath-toys'},
];

export default function CategoriesMegaMenu({onNavigate, onMouseEnter, onMouseLeave}) {
  return (
    <div 
      className="absolute left-0 top-full mt-1" 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white rounded-[16px] border border-rose-100 shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 w-full sm:w-[85vw] md:w-[70vw] lg:w-[60vw] max-w-[1200px] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] max-h-[500px] sm:max-h-[550px] md:max-h-[600px] overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 h-full">
          {categories.map((cat) => (
            <Link
              to={cat.href}
              key={cat.id}
              onClick={onNavigate}
              className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl border border-rose-100 hover:border-rose-200 hover:shadow-md transition-all"
            >
              <img src={cat.image} alt={cat.title} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full object-contain bg-rose-50 shrink-0" />
              <span className="text-xs sm:text-sm md:text-base font-semibold text-[#FF6F91] hover:text-[#c0424e] text-center">{cat.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


