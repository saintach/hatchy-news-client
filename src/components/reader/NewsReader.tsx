import * as React from 'react';

const IFrame = (props: any) => (
  <iframe {...props} />
);

class NewsReader extends React.Component {
  public render() {
    return (
      <div className="news-reader__container">
          <IFrame
            frameborder="0" border="0" cellspacing="0"
            width="100%" height="100%"
            src="https://www.reuters.com/article/us-usa-stocks/wall-street-opens-higher-on-optimism-around-nafta-progress-idUSKCN1LC147" />
      </div>
    );
  }
}

export default NewsReader;
