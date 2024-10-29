// Navigation
export const ROUTES = {
  HOME: 'Home',
  LOGIN: 'Login',
  REGISTER: 'Register',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
};

// App text
export const APP_TEXT = {
  APP_NAME: 'GYM APP',
  WELCOME_BACK: 'Welcome Back',
  CREATE_ACCOUNT: 'Create your account',
  DONT_HAVE_ACCOUNT: "Don't have an account? Sign up",
  ALREADY_HAVE_ACCOUNT: 'Already have an account? Log in',
  APP_TITLE: 'KameGym',
};

// Form labels and placeholders
export const FORM_LABELS = {
  NAME: 'Name',
  SURNAME: 'Surname',
  ADDRESS: 'Address',
  PHONE: 'Phone',
  AGE: 'Age',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  TYPE_PLAN: 'Type Plan',
};

export const FORM_PLACEHOLDERS = {
  EMAIL: 'Email',
  PASSWORD: 'Password',
  NAME: 'Name',
  SURNAME: 'Surname',
  ADDRESS: 'Address',
  PHONE: 'Phone',
  AGE: 'Age',
  CONFIRM_PASSWORD: 'Confirm Password',
};

// Menu text
export const MENU_TEXT = {
  CLOSE: 'Close',
  LOGO_SUBTEXT: 'Fitness Center',
};

// Button text
export const BUTTON_TEXT = {
  LOGIN: 'Login',
  LOGGING_IN: 'Logging in...',
  REGISTER: 'Register',
};

// Alert messages
export const ALERT_MESSAGES = {
  ERROR: 'Error',
  SUCCESS: 'Success',
  ENTER_EMAIL_PASSWORD: 'Please enter both email and password',
  INVALID_RESPONSE: 'Invalid response from server',
  LOGIN_FAILED: 'Login failed',
  NO_SERVER_RESPONSE: 'No response from server. Please try again later.',
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
  REGISTRATION_SUCCESS: 'You have registered successfully',
  REGISTRATION_ERROR: 'Something went wrong. Please try again.',
};

// Plan types
export const PLAN_TYPES = ['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'];

// Feature card content
export const FEATURE_CARDS = [
  {
    icon: 'dumbbell',
    title: 'Personal Training',
    description: 'Expert trainers to help you reach your goals.',
  },
  {
    icon: 'heart-pulse',
    title: 'Health and Wellness',
    description: 'Programs designed to improve your overall health.',
  },
  {
    icon: 'spa',
    title: 'Relaxation Zone',
    description: 'Disconnect and recharge in our relaxation areas.',
  },
];

// Image paths
export const IMAGES = {
  BACKGROUND: require('../../assets/gym.jpg'),
  LOGO: require('../../assets/kame.jpg'),
  SLIDER: [
    require('../../assets/kame.jpg'),
    require('../../assets/horarios.jpg'),
    require('../../assets/remeras.jpg'),
    require('../../assets/casallena.jpg'),
  ],
};

// Styles
export const COLORS = {
  PRIMARY: '#FFD700',
  BACKGROUND: '#000',
  TEXT: '#fff',
  INPUT_BACKGROUND: 'rgba(255, 255, 255, 0.1)',
  DARK_INPUT_BACKGROUND: '#2c2c2e',
  FORM_BACKGROUND: 'rgba(28, 28, 30, 0.8)',
  BUTTON_TEXT: '#000',
  PLACEHOLDER: '#999',
};

export const SIZES = {
  TITLE: 28,
  SUBTITLE: 20,
  BODY: 16,
  ICON: 24,
  LOGO: 40,
};

// Register Screen specific
export const REGISTER_TEXT = {
  TITLE: 'Crea tu cuenta',
  BUTTON: 'Registrarse',
  LOGIN_LINK: '¿Ya tienes una cuenta? Inicia sesión',
};

export const REGISTER_PLACEHOLDERS = {
  NAME: 'Nombre',
  SURNAME: 'Apellido',
  ADDRESS: 'Dirección',
  PHONE: 'Teléfono',
  AGE: 'Edad',
  EMAIL: 'Email',
  PASSWORD: 'Contraseña',
  CONFIRM_PASSWORD: 'Confirmar Contraseña',
};

export const REGISTER_ALERT = {
  ERROR_TITLE: 'Error',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
  SUCCESS_TITLE: 'Éxito',
  SUCCESS_MESSAGE: 'Te has registrado exitosamente',
  REGISTRATION_FAILED: 'No se pudo completar el registro. Por favor, intenta de nuevo.',
  GENERAL_ERROR: 'Algo salió mal. Por favor, intenta de nuevo.',
};


// Workout Routine Screen
export const WORKOUT_TEXT = {
  TITLE: 'Tu Rutina de Entrenamiento',
  LOADING: 'Cargando rutina...',
  ERROR: 'Error al cargar la rutina:',
  NO_USER: 'No se ha encontrado un usuario logueado.',
  NO_ROUTINE: 'No se encontró una rutina para este usuario.',
  EDIT_ROUTINE: 'Editar rutina',
  FINISH_EDIT: 'Terminar edición',
  REMOVE_ALL: 'Borrar todos los ejercicios',
  ADD_EXERCISE: 'Agregar ejercicio',
  REMOVE_DAY_EXERCISES: 'Borrar todos los ejercicios del día',
  NO_ROUTINE_FOUND: 'No se encontró una rutina para mostrar.',
};

export const MUSCLE_COLORS = {
  "Pecho": "#66CCCC",
  "Hombros": "#33CC33",
  "Espalda": "#FFA07A",
  "Piernas": "#FF69B4",
  "Bíceps": "#FFFF00",
  "Tríceps": "#FF6347",
  "Antebrazo": "#DDA0DD",
  "Abdomen": "#C71585"
};

