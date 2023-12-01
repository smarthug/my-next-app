
import { useState } from 'react';


import ProjectInputRow from './ProjectInputRow';
import ProjectYoutube from './Youtube';
import ProjectWebsite from '@/components/Website';
import Category from './Category';
import ProjectTitle from './ProjectTitle';
import ProjectDescription from './ProjectDescription';
import TeamDescription from '@/components/TeamDescription';
import ProjectImageUploader from './ProjectImageUploader';
import Policy from '@/components/Policy';
import ImageUploadButton from './ImageUploadButton';

export default function BasicInfoTab() {

    return (

        <>

            <ProjectInputRow label="프로젝트 카테고리"
                description="프로젝트 성격과 가장 일치하는 카테고리를 선택해주세요.적합하지 않을 경우 운영자에 의해 조정될 수 있습니다.">

                <Category />
            </ProjectInputRow>

            <ProjectInputRow label="프로젝트 제목" description="프로젝트의 주제, 창작물의 특징이 드러나는 멋진 제목을 붙여주세요.">

                <ProjectTitle />
            </ProjectInputRow>

            <ProjectInputRow label="프로젝트 요약" description="후원자 분들이 프로젝트를 빠르게 이해할 수 있도록 명확하고 간략하게 소개해주세요.">

                <ProjectDescription />
            </ProjectInputRow>

            <ProjectInputRow label="팀 소개" description="2~3문장으로 창작자님의 이력과 간단한 소개를 써주세요.">

                <TeamDescription />
            </ProjectInputRow>

            <ProjectInputRow label="프로젝트 대표 이미지" description="후원자들이 프로젝트의 내용을 쉽게 파악하고 좋은 인상을 받을 수 있도록 이미지 가이드라인을 따라 주세요.">

                {/* <ProjectImageUploader /> */}

                <ImageUploadButton />
            </ProjectInputRow>

            <ProjectInputRow label="프로젝트 대표 영상" description="2~3분 이내의 짧은 영상으로 프로젝트를 효과적으로 소개해보세요. 대표 영상을 등록하시면 프로젝트 상세에서 이미지와 함께 제공됩니다.">

                <ProjectYoutube />

            </ProjectInputRow>

            <ProjectInputRow label="웹사이트 주소" description="창작자님의 웹사이트를 소개해보세요.">

                <ProjectWebsite />

            </ProjectInputRow>

            <ProjectInputRow label="정책" description="후원자 분들이 프로젝트를 빠르게 이해할 수 있도록 명확하고 간략하게 소개해주세요.">

                <Policy />
            </ProjectInputRow>

        </>
    )


}