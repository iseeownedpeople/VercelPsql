import { GetStaticProps } from 'next';  
import { prisma } from '../lib/prisma';
export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.findMany({
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