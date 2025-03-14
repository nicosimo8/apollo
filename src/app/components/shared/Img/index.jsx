import Styles from './img.module.css';

const Img = ({ typeOf, customStyle, text, src, alt, onClick }) => {

  const styleChange = () => {
    switch(typeOf) {
      case 'custom':
        return ({ container: customStyle});
      case 'main':
        return ({ container: Styles.mainSettingsContainer, image: Styles.mainImageSettings });
      default:
        return ({ container: Styles.mainSettingsContainer, image: Styles.mainImageSettings });
    }
  };

  return (
    <p className={ styleChange().container } onClick={ onClick }>
      <img src={ src } className={ styleChange().image || '' } alt={ alt }></img>
      { text }
    </p>
  );
};

export default Img;
