'use client'
import { db } from '@/utils/db.js'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAns from './_components/RecordAns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const StartInterview = ({params}) => {

    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

    useEffect(()=>{
        GetInterviewDetails();

    },[]);

    const GetInterviewDetails = async () => {
        try {
            console.log('Fetching interview details...');
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
            console.log('Result:', result);
    
            if (result.length === 0) {
                throw new Error('No interview data found for the given ID');
            }
    
            console.log('Parsing JSON response...');
            const jsonMockResp = JSON.parse(result[0].jsonMockResp);
            console.log('Parsed JSON:', jsonMockResp);
    
            console.log('Updating state...');
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
        } catch (error) {
            console.error('Error fetching and parsing interview details:', error);
        }
    }
  return (
    <div>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
      
      <QuestionsSection
      mockInterviewQuestion={mockInterviewQuestion}
      activeQuestionIndex ={activeQuestionIndex}
      />

      <RecordAns 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex ={activeQuestionIndex}
            interviewData={interviewData}
      
      />

</div>

        <div className='flex justify-end gap-6 mt-2'>

       {activeQuestionIndex>0 &&
       
       
       <Button className='hover:bg-slate-700' onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button> }


        {activeQuestionIndex!=mockInterviewQuestion?.length-1 &&
        
        
        <Button className='bg-purple-950 hover:bg-purple-600' onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex ==mockInterviewQuestion?.length-1 &&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
        <Button className='bg-green-900 hover:bg-green-600'>End Interview</Button>
        </Link>}
        </div>

    
    </div>
  )
}

export default StartInterview