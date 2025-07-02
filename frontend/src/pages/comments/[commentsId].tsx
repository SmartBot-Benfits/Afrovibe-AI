import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/comments/commentsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditComments = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    content: '',

    user: null,

    track: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { comments } = useAppSelector((state) => state.comments)

  const { commentsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: commentsId }))
  }, [commentsId])

  useEffect(() => {
    if (typeof comments === 'object') {
      setInitialValues(comments)
    }
  }, [comments])

  useEffect(() => {
      if (typeof comments === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (comments)[el])

          setInitialValues(newInitialVal);
      }
  }, [comments])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: commentsId, data }))
    await router.push('/comments/comments-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit comments')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit comments'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField label="Content" hasTextareaHeight>
        <Field name="content" as="textarea" placeholder="Content" />
    </FormField>

    <FormField label='User' labelFor='user'>
        <Field
            name='user'
            id='user'
            component={SelectField}
            options={initialValues.user}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField label='Track' labelFor='track'>
        <Field
            name='track'
            id='track'
            component={SelectField}
            options={initialValues.track}
            itemRef={'tracks'}

            showField={'title'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/comments/comments-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditComments.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditComments
