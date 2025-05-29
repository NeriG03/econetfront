# Sistema de Roles - EcoNet

## 📋 Descripción General

El sistema de roles de EcoNet permite diferenciar entre usuarios administradores y usuarios normales, proporcionando accesos y funcionalidades específicas para cada tipo de usuario.

## 👥 Tipos de Usuario

### 🔧 **Administrador (admin)**

- **Acceso**: Dashboard de administración (`/admin`)
- **Permisos**:
  - Gestión completa de manuales de plantas
  - Acceso a todas las páginas de usuario
  - Vista administrativa con estadísticas
- **Navegación**: Dashboard, Home, Contacto
- **Identificación**: Badge "ADMIN" en la navbar

### 👤 **Usuario Normal (user)**

- **Acceso**: Páginas públicas de la aplicación
- **Permisos**:
  - Visualización de manuales de plantas
  - Acceso a noticias ecológicas
  - Contacto con el equipo
- **Navegación**: Home, Cuidemos, Contacto
- **Restricciones**: No puede acceder al dashboard de admin

## 🛡️ Protección de Rutas

### Guards Implementados

1. **AuthGuard**: Protege rutas que requieren autenticación
2. **AdminGuard**: Protege rutas exclusivas para administradores

### Rutas Protegidas

```typescript
// Rutas que requieren autenticación
/home - AuthGuard
/cuidemos - AuthGuard
/noticias - AuthGuard
/contacto - AuthGuard

// Rutas exclusivas para admin
/admin - AdminGuard
/admin/manuales - AdminGuard
```

## 🔐 Autenticación y Navegación

### Proceso de Login

1. Usuario ingresa credenciales
2. Sistema valida y determina rol
3. **Si es admin**: Redirige a `/admin`
4. **Si es user**: Redirige a `/home`

### Emails de Admin para Testing

- `admin@econet.com`
- `administrador@econet.com`
- `admin@admin.com`

Cualquier otro email será considerado como usuario normal.

### Proceso de Registro

1. Nuevos usuarios son asignados automáticamente como `role: 'user'`
2. Solo administradores existentes pueden crear otros administradores

## 🎨 Interfaz de Usuario

### Navbar Dinámico

La barra de navegación se adapta según el rol del usuario:

**Para Administradores:**

```
Dashboard | Home | Contacto | [Avatar] ADMIN | Salir
```

**Para Usuarios:**

```
Home | Cuidemos | Contacto | [Avatar] | Salir
```

### Información del Usuario

- **Avatar**: Muestra iniciales del nombre
- **Badge Admin**: Insignia dorada para administradores
- **Información**: Nombre y tipo de usuario
- **Logout**: Botón para cerrar sesión

## 💾 Persistencia de Datos

### LocalStorage

- Los datos del usuario se guardan en `localStorage`
- Permite mantener la sesión entre recargas
- Se limpia automáticamente al hacer logout

### Estructura del Usuario

```typescript
interface IUser {
  id: number;
  nombre: string;
  email: string;
  role: "admin" | "user";
}
```

## 🔄 Flujo de Navegación

### Usuario No Autenticado

```
Cualquier ruta protegida → Redirige a /login
```

### Usuario Autenticado

```
Login exitoso → Verifica rol → Redirige según corresponda
/admin (admin) | /home (user)
```

### Intento de Acceso No Autorizado

```
Usuario normal intenta /admin → Redirige a /home
Usuario no auth intenta ruta protegida → Redirige a /login
```

## 🚨 Características de Seguridad

1. **Validación en Frontend**: Guards que validan permisos
2. **Estado Reactivo**: Observable que actualiza UI automáticamente
3. **Limpieza de Sesión**: Logout completo con limpieza de datos
4. **Redirección Inteligente**: Previene accesos no autorizados
5. **Persistencia Segura**: Datos en localStorage con validación

## 📱 Responsive Design

### Desktop

- Información completa del usuario en navbar
- Menús horizontales con efectos hover
- Botón de logout visible

### Móvil

- Menú hamburguesa con información de usuario
- Navegación vertical optimizada
- Logout accesible en menú móvil

## 🎯 Casos de Uso

### Administrador

1. Login con email de admin
2. Acceso directo al dashboard
3. Gestión de manuales de plantas
4. Supervisión de contenido
5. Acceso a estadísticas

### Usuario Normal

1. Registro/Login estándar
2. Exploración de manuales
3. Búsqueda de plantas
4. Contacto con equipo
5. Lectura de noticias

## 🔧 Configuración Técnica

### Servicios

- **AuthService**: Gestión de autenticación y estado
- **Guards**: Protección de rutas
- **Observable**: Estado reactivo del usuario

### Componentes Afectados

- **LoginComponent**: Lógica de redirección
- **RegisterComponent**: Asignación de roles
- **NavbarComponent**: UI adaptativa
- **Guards**: Validación de permisos

Este sistema proporciona una experiencia de usuario fluida y segura, diferenciando claramente las funcionalidades disponibles para cada tipo de usuario.
