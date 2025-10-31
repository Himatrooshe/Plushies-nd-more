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
    <div className="absolute left-0 right-0 top-full mt-1 px-4" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="bg-white rounded-[16px] border border-rose-100 shadow-xl p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              to={cat.href}
              key={cat.id}
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-xl border border-rose-100 hover:border-rose-200 hover:shadow-md transition-all"
            >
              <img src={cat.image} alt={cat.title} className="w-10 h-10 rounded-full object-contain bg-rose-50" />
              <span className="text-sm font-semibold text-[#FF6F91] hover:text-[#c0424e]">{cat.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


