import * as React from 'react';

const IFrame = (props: any) => (
  <iframe id="reader" {...props} />
);

interface ILocalProps {
  src: string;
}

class NewsReader extends React.Component<ILocalProps, any> {
  public render() {
    return (
      <div className="news-reader__container">
          <IFrame
            frameBorder="0" border="0" cellSpacing="0"
            width="100%" height="100%"
            src={this.props.src} />
      </div>
    );
  }
}

export default NewsReader;
