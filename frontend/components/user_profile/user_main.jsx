import React from 'react';
import LikesContainer from './likes_container';

class UserMain extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchImages({ user_id: userId });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.id !== nextProps.user.id) {
      const userId = nextProps.user.id;
      this.props.fetchImages({ user_id: userId });
    }
  }

  render() {
    const images = this.props.images;

    return (
      <div className="user-main">
      <main className="image-main">
        <h4 className="user-header">Selected Work</h4>
        <ul className="image-grid">
          {images.map((image, idx) => (
            <li className="image-small" key={image.id}>
              <img src={image.img_url}/>
            </li>
          ))}
        </ul>
      </main>
      <LikesContainer />
      </div>
    );
  }
}

export default UserMain;
