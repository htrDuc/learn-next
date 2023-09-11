import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

export interface IAboutProps {
}

export default function About (props: IAboutProps) {
  return (
    <div>
      About
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IAboutProps> = async (context: GetServerSidePropsContext) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
	return {
		props: {
		},
	}
}
