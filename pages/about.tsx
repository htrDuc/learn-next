import { AdminLayout, MainLayout } from '@/layout';
import { NextPageWithLayout } from '@/models';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

export interface IAboutProps {
}

const About: NextPageWithLayout<IAboutProps> = (props: IAboutProps) => {
  return (
    <div>
      About
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IAboutProps> = async (context: GetServerSidePropsContext) => {
    await new Promise((resolve) => setTimeout(resolve))
	return {
		props: {
		},
	}
}

About.Layout = MainLayout

export default About