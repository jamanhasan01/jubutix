import Hero from '../components/Hero'
import Blogs from './components/Blogs'

const BlogPage = async () => {
  return (
    <div>
      <Hero heading='Our Blog' desc='Stay up-to-date with the latest articles and posts.' />
      <Blogs />
    </div>
  )
}

export default BlogPage
