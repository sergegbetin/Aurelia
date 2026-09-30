import { Link, Navigate, useParams } from 'react-router-dom'
import { getCategory } from '../data/categories'
import { ProductExplorer } from '../components/shop/ProductExplorer'
import { Reveal } from '../components/ui/Primitives'
import { ArrowRightIcon } from '../components/ui/Icons'

export function CategoryPage() {
  const { slug } = useParams()
  const category = getCategory(slug)

  if (!category) return <Navigate to="/shop" replace />

  return (
    <>
      <ProductExplorer
        key={category.slug}
        eyebrow="Category"
        title={category.name}
        titleNode={
          <span className="flex flex-col gap-3">
            <span>{category.name}</span>
            <span className="font-display text-xl font-light normal-case italic tracking-normal text-gold-light sm:text-2xl">
              {category.headline}
            </span>
          </span>
        }
        subtitle={category.description}
        heroImage={category.image}
        defaultCategory={category.slug}
      />

      <section className="border-t border-noir/10 bg-ivory-soft">
        <div className="container-luxe flex flex-col items-center gap-6 py-14 text-center">
          <Reveal className="flex flex-col items-center gap-4">
            <span className="eyebrow">Keep exploring</span>
            <p className="max-w-xl font-display text-2xl font-light text-noir/85">
              Every category is curated for the same idea — start the year beautifully.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link to="/shop?view=new" className="btn-primary">
                New arrivals <ArrowRightIcon size={15} />
              </Link>
              <Link to="/shop?category=gifts" className="btn-outline">
                Gift guide
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
