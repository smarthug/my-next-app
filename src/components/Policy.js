import React, { use, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import useFundStore from '../utils/store';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'red',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'red',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'red',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'red',
    },
  },
});

const tmpPolicy = `(예시) 아래와 같은 사항을 고려해서 작성해주세요. 진행하는 프로젝트에 해당되지 않는 항목은 삭제해주세요.

· 펀딩 마감 이후에는 후원금액이 창작자에게 전달되기에 텀블벅을 통해 환불이 불가합니다. 환불은 창작자가 환불계좌를 받아 반환하는 방식으로만 가능하며, 어떤 경우에 환불이 가능한지를 기재해주세요.
· 펀딩 성사 후 지연 또는 선물 전달에 문제가 발생했을 때에 어떤 식으로 대응하시겠어요? 이 프로젝트 특성상 발생할 수 있는 문제에 대한 추가적인 정책이나 약속이 있다면 기재해주세요. (후원금 환불, 대체 보상 등)
· 배송이 필요한 선물에 문제가 발생한 경우 교환, A/S는 어떻게 진행되나요?
· 디지털 콘텐츠 리워드는 타인에게 양도가 가능한가요?
· 오프라인으로 전달되는 선물(공연, 전시 등)은 타인에게 양도가 가능한가요?`

export default function CustomizedInputs() {
  // const teamContent = useFundStore(state => state.teamContent);
  // const setTeamContent = useFundStore(state => state.setTeamContent);

  // const handleTeamContentChange = (event) => {
  //   setTeamContent(event.target.value);
  // }

  const policy = useFundStore(state => state.policy);
  const setPolicy = useFundStore(state => state.setPolicy);

  const handlePolicyChange = (event) => {
    setPolicy(event.target.value);
  }

  useEffect(() => {
    if (policy.length == 0) {

      setPolicy(tmpPolicy);
    }
  }, [])


  return (
    <form noValidate autoComplete="off">
      <CssTextField
        label="정책"
        variant="outlined"
        color="secondary"
        fullWidth
        multiline
        rows={4}

        defaultValue={tmpPolicy}

        margin="normal"
        value={policy}
        onChange={handlePolicyChange}
        InputProps={{
          // endAdornment: <InputAdornment position="end">{`${policy.length}/300`}</InputAdornment>,
        }}
      />

    </form>
  );
}
