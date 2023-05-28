import {IFootyStatsMatch} from "./IFootyStatsMatch.js";

export interface IFootyStatsMatchWithDetails extends IFootyStatsMatch{
  lineups: {
    team_a: {
      player_id: number,
      shirt_number: number,
      player_events: {
          event_type: string
          event_time: string
      }[]
    }[]
    team_b: {
      player_id: number,
      shirt_number: number,
      player_events: {
        event_type: string
        event_time: string
      }[]
    }[]
  }
  bench: {
    team_a: {
      player_in_id: number,
      player_in_shirt_number: number,
      player_out_id: number,
      player_out_time: string,
      player_in_events: {
        event_type: string
        event_time: string
      }[]
    }[]
    team_b: {
      player_in_id: number,
      player_in_shirt_number: number,
      player_out_id: number,
      player_out_time: string,
      player_in_events: {
        event_type: string
        event_time: string
      }[]
    }[]
  }
  team_a_goal_details: {
    player_id: number,
    time: string,
    extra: unknown,
    assist_player_id: number
  }[]
  team_b_goal_details: {
    player_id: number,
    time: string,
    extra: unknown,
    assist_player_id: number
  }
  trends: {
    home: string[][]
    away: string[][]
  }
  h2h: {
    previous_matches_ids: {
      id: number
    }[]
  }
  "weather": {
    code: string,
    humidity: string,
    temperature_celcius: {
      temp: number
    },
    wind: {
      degree: number,
      speed: string
    },
    pressure: number,
    type: string
    clouds: string
  },
}
