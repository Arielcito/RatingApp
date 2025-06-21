# Sistema de Medición de Rating

## Descripción General

El sistema de medición de rating permite trackear automáticamente qué contenido están viendo/escuchando los usuarios de la aplicación. Esta funcionalidad envía datos en tiempo real al backend cada vez que un usuario interactúa con contenido multimedia.

## Arquitectura del Sistema

### 1. **Tipos TypeScript** (`src/types/rating.ts`)
- `DetailRecordRequest`: Estructura del request que se envía al backend
- `RatingRecord`: Interfaz para records de rating locales
- `GeolocationPosition`: Tipos para coordenadas GPS

### 2. **Servicio Core** (`src/services/detail-record.service.ts`)
- `DetailRecordService.trackChannelAction()`: Función principal para trackear acciones
- `DetailRecordService.getCurrentLocation()`: Obtiene ubicación GPS del usuario
- `DetailRecordService.sendDetailRecord()`: Envía datos al backend

### 3. **Hook Personalizado** (`src/hooks/use-rating-tracker.ts`)
- `useRatingTracker()`: Hook que maneja el estado de tracking
- Funciones: `trackPlay()`, `trackStop()`, `trackChannelChange()`, `cleanup()`
- Incluye debouncing para evitar spam de requests

## Implementación por Componente

### MediaPlatform (TV)
- Trackea cuando se reproduce/pausa video
- Envía datos al cambiar de canal
- Limpia recursos al desmontar componente

### RadioInterface (Radio)
- Trackea reproducción/pausa de audio
- Detecta cambios de emisora
- Maneja estados de carga y error

### StreamingPlatform (Streaming)
- Similar a MediaPlatform pero para contenido streaming
- Maneja tanto video como audio streaming

## Flujo de Datos

1. **Usuario interactúa** (play/pause/cambio de canal)
2. **Hook detecta acción** y llama función apropiada
3. **Servicio obtiene ubicación** (opcional, con timeout)
4. **Request se construye** con:
   - `ratingSignalId`: ID del canal/contenido
   - `action`: 1 = play, 0 = stop
   - `latitude/longitude`: Coordenadas GPS (si disponibles)
   - `id`: ID de sesión/record (opcional)
5. **Datos se envían** al endpoint `/detailRecord/add`

## API Endpoint

```typescript
POST /detailRecord/add
Headers:
  Content-Type: application/json; charset=UTF-8
  Accept-Charset: utf-8
  Authorization: Bearer <token>

Body:
{
  "ratingSignalId": 123,
  "latitude": -34.6037,
  "longitude": -58.3816,
  "action": 1,
  "id": 456
}
```

## Características Implementadas

### ✅ Tracking Automático
- Se activa automáticamente en play/pause
- Detecta cambios de canal/emisora
- Maneja transiciones entre contenido

### ✅ Geolocalización Inteligente
- Solicita permisos de ubicación
- Timeout configurado (5 segundos)
- Funciona sin ubicación si no está disponible
- Cache de ubicación (5 minutos)

### ✅ Optimizaciones
- **Debouncing**: Evita spam de requests
- **Cleanup**: Limpia recursos al desmontar
- **Error Handling**: No rompe la UX si falla
- **Logging**: Mensajes detallados para debugging

### ✅ Autenticación
- Usa token de localStorage/sessionStorage
- Maneja casos sin autenticación gracefully

## Configuración

### Variables de Entorno
```env
NEXT_PUBLIC_BACKEND_URL=https://ratingapp.net.ar:18000
```

### Tokens de Autenticación
El sistema busca tokens en:
1. `localStorage.getItem('authToken')`
2. `sessionStorage.getItem('authToken')`

## Uso del Hook

```typescript
import { useRatingTracker } from '@/hooks/use-rating-tracker'

function MyComponent() {
  const { trackPlay, trackStop, trackChannelChange, cleanup } = useRatingTracker({
    enabled: true,        // Opcional: habilitar/deshabilitar
    debounceMs: 1000     // Opcional: tiempo de debounce
  })

  // Usar las funciones según sea necesario
  const handlePlay = () => {
    trackPlay(currentChannel)
  }

  // Cleanup al desmontar
  useEffect(() => {
    return () => cleanup()
  }, [cleanup])
}
```

## Logs y Debugging

El sistema genera logs detallados para debugging:
- `Tracking play action for rating measurement`
- `Tracking channel change for rating measurement`
- `Geolocation obtained for rating tracking`
- `Rating data sent successfully`
- `Error sending rating data:`

## Consideraciones de Privacidad

- La geolocalización es **opcional**
- Se solicita permiso al usuario
- Funciona completamente sin ubicación
- No se almacenan datos sensibles localmente

## Testing

Para probar el sistema:
1. Abrir DevTools > Console
2. Reproducir contenido
3. Verificar logs de tracking
4. Cambiar canales/emisoras
5. Pausar/reanudar reproducción

## Próximas Mejoras

- [ ] Configuración de intervalos de heartbeat
- [ ] Métricas de tiempo de visualización
- [ ] Sincronización offline
- [ ] Dashboard de analytics
- [ ] A/B testing del sistema de tracking 