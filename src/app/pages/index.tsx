
import { GetStaticProps } from 'next';  
import { prisma } from '../lib/prisma';

function page() {
  return (
    <div> 
      Public HomePage
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return {
      props: { feed },
      revalidate: 10,
    };
  };

export default page
