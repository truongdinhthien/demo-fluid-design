console.log('Hello bear')

const convertToRem = (px) => Math.round(px / 16 * 100) / 100;
const getValueInput = (e) => !e.disabled && +e.value;
const getValueInputRem = (e) => !e.disabled && convertToRem(+e.value);

const generateStyle = ({ maxWidth = 0, padding = 0, designWidth = 0, minWidth = 0}) => {
  const isOpenResponsive = designWidth && minWidth;

  const htmlFontSize = designWidth ? `${1600 / designWidth}vw` : `1rem`;
  const maxWidthContainer = maxWidth ? `${maxWidth}px` : 'none';
  const maxWidthFontSize = 1600 / designWidth * maxWidth / 100;
  const minWidthFontSize = 1600 / designWidth * minWidth / 100;

  const result = `<style id="style">
        html {
          font-size: ${htmlFontSize};
        }

        ${isOpenResponsive && maxWidth ? `@media screen and (min-width:${maxWidthContainer}) {
          html {font-size: ${maxWidthFontSize}px;}
        }`: ''}

        .container {
          max-width: ${maxWidthContainer};
          padding-left: ${padding}rem;
          padding-right: ${padding}rem;
        }

        ${isOpenResponsive ? `@media screen and (max-width:${minWidth}px) {
          html {font-size: ${minWidthFontSize}px;}
        }`: ''}

      </style>`;
  if(document.querySelector('#style')) {
    document.querySelector('#style').remove();
  }
  document.head.insertAdjacentHTML('beforeend', result);
  console.log(result);
}

const responsiveSection = document.querySelector('.section__block--responsive');

const inputContainerMaxWidth = document.querySelector('#container-max-width');
const inputPadding = document.querySelector('#container-padding');
const inputDesignWidth = document.querySelector('#design-width');
const inputDesignMinWidth = document.querySelector('#design-min-width');

const toggleContainerMaxWidth = document.querySelector('#toggle-container-max-width');
const toggleResponsive = document.querySelector('#toggle-responsive');

const button = document.querySelector('#button');


toggleContainerMaxWidth.addEventListener('click', (e) => {
  toggleContainerMaxWidth.classList.toggle('active')
  inputContainerMaxWidth.disabled = !inputContainerMaxWidth.disabled;
})

toggleResponsive.addEventListener('click', (e) => {
  toggleResponsive.classList.toggle('active');
  inputDesignWidth.disabled = !inputDesignWidth.disabled;
  inputDesignMinWidth.disabled = !inputDesignMinWidth.disabled;
})

button.addEventListener('click', (e) => {
  generateStyle({
    designWidth: getValueInput(inputDesignWidth),
    minWidth: getValueInput(inputDesignMinWidth),
    padding: getValueInputRem(inputPadding),
    maxWidth: getValueInput(inputContainerMaxWidth)
  })
});
