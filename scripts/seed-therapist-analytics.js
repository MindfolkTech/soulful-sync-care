// Seed data for therapist_analytics table
// This creates realistic analytics data for existing therapist profiles

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate realistic analytics data for the last 30 days
function generateAnalyticsData(therapistId, therapistName) {
  const analytics = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Generate realistic but varied metrics
    const baseSessionsPerDay = Math.floor(Math.random() * 6) + 2; // 2-7 sessions per day
    const completedSessions = Math.floor(baseSessionsPerDay * (0.85 + Math.random() * 0.1)); // 85-95% completion rate
    const cancelledSessions = Math.floor((baseSessionsPerDay - completedSessions) * 0.7);
    const noShowSessions = baseSessionsPerDay - completedSessions - cancelledSessions;
    
    // UK therapy rates: £50-120 per session
    const sessionRate = 60 + Math.random() * 40; // £60-100 average
    const totalEarnings = completedSessions * sessionRate;
    
    // Client metrics
    const newClients = Math.floor(Math.random() * 3); // 0-2 new clients per day
    const returningClients = completedSessions - newClients;
    
    // Session ratings (4.2-4.9 out of 5)
    const averageRating = 4.2 + Math.random() * 0.7;
    
    analytics.push({
      therapist_id: therapistId,
      metric_date: dateString,
      total_sessions: baseSessionsPerDay,
      completed_sessions: completedSessions,
      cancelled_sessions: cancelledSessions,
      no_show_sessions: noShowSessions,
      total_earnings: Math.round(totalEarnings * 100) / 100, // Round to 2 decimal places
      average_session_rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      new_clients: newClients,
      returning_clients: Math.max(0, returningClients),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return analytics;
}

// Generate session earnings data
function generateSessionEarnings(therapistId, analyticsData) {
  const earnings = [];
  let sessionCounter = 1;
  
  analyticsData.forEach(dayData => {
    const sessionRate = dayData.total_earnings / Math.max(1, dayData.completed_sessions);
    
    for (let i = 0; i < dayData.completed_sessions; i++) {
      const grossAmount = sessionRate;
      const platformFee = grossAmount * 0.15; // 15% platform fee
      const netAmount = grossAmount - platformFee;
      
      // Vary payout status realistically
      let payoutStatus;
      const random = Math.random();
      if (random < 0.7) {
        payoutStatus = 'paid';
      } else if (random < 0.9) {
        payoutStatus = 'processing';
      } else {
        payoutStatus = 'pending';
      }
      
      const payoutDate = payoutStatus === 'paid' 
        ? new Date(dayData.metric_date + 'T00:00:00Z')
        : null;
      
      earnings.push({
        id: `session_${therapistId.slice(-8)}_${sessionCounter}`,
        appointment_id: `appt_${therapistId.slice(-8)}_${sessionCounter}`,
        therapist_id: therapistId,
        gross_amount: Math.round(grossAmount * 100) / 100,
        platform_fee: Math.round(platformFee * 100) / 100,
        net_amount: Math.round(netAmount * 100) / 100,
        payout_status: payoutStatus,
        payout_date: payoutDate?.toISOString(),
        created_at: new Date(dayData.metric_date + 'T00:00:00Z').toISOString()
      });
      
      sessionCounter++;
    }
  });
  
  return earnings;
}

async function seedTherapistAnalytics() {
  try {
    console.log('🌱 Starting therapist analytics seeding...');
    
    // Get existing therapist profiles
    const { data: therapists, error: therapistError } = await supabase
      .from('therapist_profiles')
      .select('user_id, name')
      .eq('verified', true)
      .eq('is_active', true);
    
    if (therapistError) {
      throw new Error(`Failed to fetch therapists: ${therapistError.message}`);
    }
    
    if (!therapists || therapists.length === 0) {
      console.log('⚠️  No verified therapists found. Creating sample data for existing profiles...');
      
      // Get any therapist profiles
      const { data: allTherapists, error: allError } = await supabase
        .from('therapist_profiles')
        .select('user_id, name')
        .limit(5);
      
      if (allError || !allTherapists || allTherapists.length === 0) {
        throw new Error('No therapist profiles found in database');
      }
      
      therapists.push(...allTherapists);
    }
    
    console.log(`📊 Found ${therapists.length} therapist profiles to seed`);
    
    // Clear existing analytics data
    console.log('🧹 Clearing existing analytics data...');
    await supabase.from('therapist_analytics').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('session_earnings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Generate and insert analytics data for each therapist
    for (const therapist of therapists) {
      console.log(`📈 Generating analytics for ${therapist.name}...`);
      
      const analyticsData = generateAnalyticsData(therapist.user_id, therapist.name);
      const earningsData = generateSessionEarnings(therapist.user_id, analyticsData);
      
      // Insert analytics data
      const { error: analyticsError } = await supabase
        .from('therapist_analytics')
        .insert(analyticsData);
      
      if (analyticsError) {
        console.error(`❌ Failed to insert analytics for ${therapist.name}:`, analyticsError);
        continue;
      }
      
      // Insert earnings data
      const { error: earningsError } = await supabase
        .from('session_earnings')
        .insert(earningsData);
      
      if (earningsError) {
        console.error(`❌ Failed to insert earnings for ${therapist.name}:`, earningsError);
        continue;
      }
      
      console.log(`✅ Seeded ${analyticsData.length} days of analytics and ${earningsData.length} earnings records for ${therapist.name}`);
    }
    
    // Verify the data
    const { data: analyticsCount } = await supabase
      .from('therapist_analytics')
      .select('id', { count: 'exact', head: true });
    
    const { data: earningsCount } = await supabase
      .from('session_earnings')
      .select('id', { count: 'exact', head: true });
    
    console.log(`🎉 Seeding complete!`);
    console.log(`📊 Total analytics records: ${analyticsCount?.length || 0}`);
    console.log(`💰 Total earnings records: ${earningsCount?.length || 0}`);
    
    // Show sample data
    const { data: sampleAnalytics } = await supabase
      .from('therapist_analytics')
      .select('therapist_id, metric_date, total_sessions, total_earnings')
      .limit(5);
    
    console.log('\n📋 Sample analytics data:');
    console.table(sampleAnalytics);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding
if (import.meta.url === `file://${process.argv[1]}`) {
  seedTherapistAnalytics();
}

export { seedTherapistAnalytics };
