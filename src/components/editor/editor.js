// /* eslint-disable perfectionist/sort-imports */
// import 'src/utils/highlight';

// import PropTypes from 'prop-types';

import { alpha } from '@mui/material/styles';

import { useRef, useMemo } from 'react';
import { ipfsUploadImage } from 'src/utils/ipfsUpload';

import dynamic from 'next/dynamic';
import Skeleton from '@mui/material/Skeleton';
import { StyledEditor } from './styles';
import Toolbar, { formats } from './toolbar';


// const ReactQuill = dynamic(() => import('react-quill'), {
//   ssr: false,
//   loading: () => (
//     <Skeleton
//       sx={{
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         height: 1,
//         borderRadius: 1,
//         position: 'absolute',
//       }}
//     />
//   ),
// });


const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    // eslint-disable-next-line react/prop-types, react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
    loading: () => (
      <Skeleton
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          borderRadius: 1,
          position: 'absolute',
        }}
      />
    ),
  }
);

// ----------------------------------------------------------------------




export default function Editor({
  id = 'minimal-quill',
  error,
  simple = false,
  helperText,
  sx,
  ...other
}) {
  const quillRef = useRef(false);






  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];

      try {

        const imgUrl = await ipfsUploadImage([file]);
        console.log(imgUrl)


        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', imgUrl);
        editor.setSelection(range.index + 1);
      } catch (inError) {
        console.log(inError);
      }
    });
  };

  // const modules = {
  //   toolbar: {
  //     container: `#${"test"}`,

  //     handlers: {
  //       image: imageHandler
  //     }
  //   },
  //   history: {
  //     delay: 500,
  //     maxStack: 100,
  //     userOnly: true,
  //   },
  //   syntax: true,
  //   clipboard: {
  //     matchVisual: false,
  //   },
  // };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${id}`,
        handlers: {
          image: imageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      syntax: true,
      clipboard: {
        matchVisual: false,
      },
    }),
    [id]
  );


  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
            '& .ql-editor': {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }),
          ...sx,
        }}
      >
        <Toolbar id={id} simple={simple} />

        <ReactQuill
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
          forwardedRef={quillRef}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}

// Editor.propTypes = {
//   error: PropTypes.bool,
//   helperText: PropTypes.object,
//   id: PropTypes.string,
//   simple: PropTypes.bool,
//   sx: PropTypes.object,
// };
