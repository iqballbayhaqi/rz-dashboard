// @flow
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { host } from '../../utils/helpers';

type Props = {
  children: React.Node,
  title?: string,
  description?: string,
  keywords?: string,
  canonical: string,
  image?: string,
  pubDate?: string,
  isArticle?: boolean,
};

type State = {
  visibleModal: boolean,
};

class BaseLayout extends React.PureComponent<Props, State> {
  static defaultProps = {
    title: 'RZ DASHBOARD',
    description: 'Dashboard Example built with React JS',
    keywords: 'admin, admin react, dashboard',
    image: `${host}/assets/logo.png`,
    pubDate: '',
    isArticle: false,
  }

  render() {
    const {
      children,
      title,
      description,
      keywords,
      canonical,
      image,
      pubDate,
      isArticle,
    } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          {isArticle && <html lang="id" itemScope itemType="http://schema.org/Article" />}
          <title>
            {title}
          </title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content="Rizal Ibnu" />
          <meta name="robots" content="index, follow" />
          <meta itemProp="name" content={title} />
          <meta itemProp="description" content={description} />
          <meta itemProp="image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@rizalibnuabd" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:creator" content="@rizalibnuabd" />
          <meta name="twitter:image:src" content={image} />
          <meta property="og:title" content={title} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={canonical} />
          <meta property="og:image" content={image} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content="RizalIbnu.com" />
          {isArticle && <meta property="article:published_time" content={pubDate} />}
          {isArticle && <meta property="article:modified_time" content={pubDate} />}
          <link rel="canonical" href={host + canonical} />
        </Helmet>
        {children}
      </React.Fragment>
    );
  }
}

export default BaseLayout;
