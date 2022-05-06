import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { TicketSchema } from '../models/Ticket.js';
import { TowerEventSchema } from '../models/TowerEvent.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  TowerEvents = mongoose.model("TowerEvent", TowerEventSchema);
  Tickets = mongoose.model("Ticket", TicketSchema)
}

export const dbContext = new DbContext()
