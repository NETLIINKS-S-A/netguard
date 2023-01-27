import { customerView } from "./Customer/CustomerView.js";
import { usersView } from "./Users/Users/UsersView.js";
import { guardsView } from "./Users/Guards/GuardsView.js";
import { emergencyUserView } from "./Users/Emergency/EmergencyUserView.js";
import { eventView } from "./Binnacle/Events/EventView.js";
import { platformView } from "./Binnacle/Platform/PlatformView.js";
import { administratorsView } from "./Users/Administrators/AdministratorView.js";
import { citadelsView } from "./Citadels/CitadelsView.js";
import { visitsView } from "./Binnacle/Visits/VisitsView.js";
import { notesView } from "./Binnacle/Notes/NotesView.js";
import { AppPreferences } from "./Preferences/Preferences.js";
export const view = {
    customer: customerView(),
    clients: usersView(),
    guards: guardsView(),
    emergencyContact: emergencyUserView(),
    events: eventView(),
    platform: platformView(),
    administrators: administratorsView(),
    citadels: citadelsView(),
    visits: visitsView(),
    notes: notesView(),
    preferences: AppPreferences()
};
