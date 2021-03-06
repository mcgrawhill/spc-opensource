# ActivityTracker

Clase que encapsula el protocolo de comunicación y utiliza delegación para notificaciones asíncronas.

## Funcionamiento

La conexión con el dispositivo se realiza de manera asíncrona utilizando Bluetooth.

Para ejecutar cualquier comando primero es necesario instanciar la clase `ActivityTracker` con un `CBPeripheral` al que se haya conectado anteriormente utilizando el método de `ActivityTrackerManager` `- (void)connectTo:(NSStrins *)deviceId;` y asignarle un delegado obligatoriamente que recibirá todas las respuestas asíncronas.

Podemos hacerlo por ejemplo así:

```objc
self.activityTrackerManager = [ActivityTrackerManager sharedInstance];
self.activityTracker = [[ActivityTracker alloc] initWithPeripheral:self.activityTrackerManager.activityTracker.peripheral delegate:self];
[self.activityTracker discoverServices];
```

A partir de ahí podemos llamar a una de las funciones disponibles, que retornan inmediatamente.

Y cuando el dispositivo ejecute el comando devuelva una o varias respuestas será invocado en el delegado el método response correspondiente siguiendo el protocolo `ActivityTrackerDelegate`. Por ejemplo al comando `- (void)getTime;` le seguirá en el futuro la respuesta `- (void)activityTrackerGetTimeResponse:(NSDate *)date;` con el parámetro date con la fecha actual del dispositivo.

La mayoría de comandos devuelven una sola respuesta. Algunos comandos devuelven varias respuestas como:

- `- (void)getTotalActivityData:(Byte)day;` 2 respuestas (revisar protocolo)
- `- (void)getDetailActivityData:(Byte)day;` hasta 96 respuestas (con información almacenada cada 15 minutos)

## ActivityTracker

Clase que encapsula el protocolo de comunicación y utiliza delegación para notificaciones asíncronas.

### Métodos

```objc
- (void)setTime:(NSDate *)date;
- (void)getTime;
- (void)setPersonalInformationMale:(BOOL)male
                               age:(Byte)age
                            height:(Byte)height
                            weight:(Byte)weight
                            stride:(Byte)stride;
- (void)getPersonalInformation;
- (void)getCurrentActivityInformation;
- (void)getTotalActivityData:(Byte)day;
- (void)getDetailActivityData:(Byte)day;
- (void)deleteActivityData:(Byte)day;
- (void)startRealTimeMeterMode;
- (void)stopRealTimeMeterMode;
- (void)queryDataStorage;
- (void)setTargetSteps:(int)steps;
- (void)getTargetSteps;
- (void)getActivityGoalAchievedRate:(Byte)day;

// Comandos para nuevas pulseras
- (void)safeBondingSavePassword:(NSString *)password;
- (void)safeBondingSendPassword:(NSString *)password;
- (void)safeBondingStatus;

- (void)switchSleepMonitorMode;

- (void)startECGMode;
- (void)stopECGMode;
- (void)deleteECGData;
- (void)getECGData:(Byte)index;
```

### Protocolo `ActivityTrackerDelegate.h`

Protocolo con las posibles respuestas al delegado asignado durante la creación de un ActivityTracker:

```objc
self.activityTrackerManager = [ActivityTrackerManager sharedInstance];
self.activityTracker = [[ActivityTracker alloc] initWithPeripheral:self.activityTrackerManager.activityTracker.peripheral delegate:self];
[self.activityTracker discoverServices];
```

```objc
@class ActivityTracker;

@protocol ActivityTrackerDelegate <NSObject>

@optional
- (void)activityTrackerReady:(ActivityTracker *)activityTracker;

- (void)activityTrackerSafeBondingSavePasswordResponse;
- (void)activityTrackerSafeBondingSendPasswordResponse:(BOOL)error;
- (void)activityTrackerSafeBondingStatusResponse:(BOOL)error;

- (void)activityTrackerSetTimeResponse;
- (void)activityTrackerGetTimeResponse:(NSDate *)date;

- (void)activityTrackerSetPersonalInformationResponse;
- (void)activityTrackerGetPersonalInformationResponseMan:(BOOL)man
                                                     age:(Byte)age
                                                  height:(Byte)height
                                                  weight:(Byte)weight
                                              stepLength:(Byte)stepLength
                                                deviceId:(NSString *)deviceId;

- (void)activityTrackerGetTotalActivityDataResponseDay:(int)day
                                                  date:(NSDate *)date
                                                 steps:(int)steps
                                          aerobicSteps:(int)aerobicSteps
                                              calories:(int)calories;
- (void)activityTrackerGetTotalActivityDataResponseDay:(int)day
                                                  date:(NSDate *)date
                                              distance:(int)distance
                                          activityTime:(int)activityTime;

- (void)activityTrackerGetDetailActivityDataDayResponseIndex:(int)index
                                                        date:(NSDate *)date
                                                       steps:(int)steps
                                                aerobicSteps:(int)aerobicSteps
                                                    calories:(int)calories
                                                    distance:(int)distance;

- (void)activityTrackerGetDetailActivityDataSleepResponseIndex:(int)index
                                                  sleepQualities:(NSArray *)sleepQualities;

- (void)activityTrackerGetDetailActivityDataResponseWithoutData;

- (void)activityTrackerDeleteActivityDataResponse;

- (void)activityTrackerRealTimeModeResponseSteps:(int)steps
                                    aerobicSteps:(int)aerobicSteps
                                        calories:(int)calories
                                        distance:(int)distance
                                    activityTime:(int)activityTime;
- (void)activityTrackerStopRealTimeMeterModeResponse;
- (void)activityTrackerSwitchSleepMonitorModeResponse;

- (void)activityTrackerStartECGModeResponse;
- (void)activityTrackerECGModeResponseDate:(NSDate *)date
                                      data:(NSArray *)data;
- (void)activityTrackerStopECGModeResponse;
- (void)activityTrackerDeleteECGDataResponse;
- (void)activityTrackerGetECGDataResponseDate:(NSDate *)date
                                    heartRate:(int)heartRate;

- (void)activityTrackerGetCurrentActivityInformationResponseSteps:(int)steps
                                                     aerobicSteps:(int)aerobicSteps
                                                         calories:(int)calories
                                                         distance:(int)distance
                                                     activityTime:(int)activityTime;

- (void)activityTrackerQueryDataStorageResponse:(NSArray *)dataStorage;

- (void)activityTrackerSetTargetStepsResponse;
- (void)activityTrackerGetTargetStepsResponse:(int)steps;
- (void)activityTrackerGetActivityGoalAchievedRateResponseDay:(Byte)dayIndex
                                                         date:(NSDate *)date
                                             goalAchievedRate:(int)goalAchievedRate
                                                activitySpeed:(int)activitySpeed
                                                           ex:(int)ex
                                          goalFinishedPercent:(int)goalFinishedPercent;

- (void)activityTrackerResetToFactorySettingsResponse;
- (void)activityTrackerResetMCUResponse;
- (void)activityTrackerFirmwareUpdateResponse;

@end
```
