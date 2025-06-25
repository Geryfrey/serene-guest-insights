
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { feedbackId, text } = await req.json()

    console.log('Analyzing feedback:', { feedbackId, text })

    // Call the ML API
    const analysisResult = await analyzeFeedbackWithML(text)
    
    // Update the feedback record with analysis results
    const { error } = await supabaseClient
      .from('feedback')
      .update({
        sentiment: analysisResult.sentiment,
        category: analysisResult.category,
      })
      .eq('id', feedbackId)

    if (error) {
      console.error('Database update error:', error)
      throw error
    }

    console.log('Feedback analysis completed:', analysisResult)

    return new Response(
      JSON.stringify({ success: true, analysis: analysisResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error analyzing feedback:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

// Call the ML API at http://127.0.0.1:5000/
async function analyzeFeedbackWithML(text: string) {
  console.log('Starting ML analysis for text:', text)
  
  try {
    const response = await fetch('http://127.0.0.1:5000/api/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
      })
    })

    if (!response.ok) {
      throw new Error(`ML API error: ${response.status} ${response.statusText}`)
    }

    const mlResult = await response.json()
    console.log('ML API response:', mlResult)
    
    // Transform the ML API response to match your database schema
    return {
      sentiment: mlResult.sentiment || 'neutral',
      category: mlResult.category || 'general',
      confidence: mlResult.confidence || 0.5
    }
  } catch (error) {
    console.error('ML API call failed:', error)
    
    // Fallback to neutral values if ML API fails
    return {
      sentiment: 'neutral',
      category: 'general',
      confidence: 0.0
    }
  }
}
