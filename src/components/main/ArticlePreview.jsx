import React from 'react';
import SharingButtons from 'components/main/SharingButtons';
import { Link } from 'react-router';
import BaseComponent from 'lib/BaseComponent';
import _ from 'lodash';

// Components
import AuthorList from 'components/main/AuthorList';

export default class ArticlePreview extends BaseComponent {
  render() {
    const { article } = this.props;
    let url = `/issue/${article.issueNumber.toString()}/${
      article.category.slug
    }/${article.slug}`;
    if (article.is_interactive) {
      // We don't use standard url for interactive articles
      url = `/interactive/${article.slug}`;
    }
    if (!article.image_url) {
      // Article image default
      article.image_url =
        'https://thegazelle.s3.amazonaws.com/gazelle/2016/02/saadiyat-reflection.jpg';
    }
    return (
      <div className="article-preview">
        <Link to={url}>
          <img
            className="article-preview__featured-image"
            src={article.image_url}
            alt="featured"
          />
        </Link>
        {/* Article title with link to article */}
        <div className="article-preview__content">
          <Link to={`/category/${article.category.slug}`}>
            <p className="article-preview__content__category-header">
              {article.category.slug.replace('-', ' ')}
            </p>
          </Link>

          <Link to={url}>
            <h3 className="article-preview__content__title">{article.title}</h3>
          </Link>
          {/* Author(s) */}
          <div className="article-preview__content__authors">
            <AuthorList authors={_.toArray(article.authors)} />
          </div>

          {/* Article teaser */}
          <p className="article-preview__content__teaser">{article.teaser}</p>
          <SharingButtons
            title={article.title}
            url={`thegazelle.org${url}`}
            teaser={article.teaser}
          />
        </div>
      </div>
    );
  }
}

// Validate shape of article JSON object
ArticlePreview.propTypes = {
  article: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    // Teaser not used for Trending component
    teaser: React.PropTypes.string,
    issueNumber: React.PropTypes.number.isRequired,
    category: React.PropTypes.shape({
      slug: React.PropTypes.string.isRequired,
    }).isRequired,
    slug: React.PropTypes.string.isRequired,
    authors: React.PropTypes.object,
  }),
};
