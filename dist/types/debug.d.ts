/**
 * A type of debug errors
 *
 * - `soft` - informative, only logs to console
 * - `hard` - throws exceptions, forcing proper error-handling
 */
export declare type ExceptionType = 'soft' | 'hard';
/**
 * Dictates the type of debug to set
 *
 * - `*` - debug everything
 * - `connection` - debug the orm connection
 * - `driver` - debug all drivers
 * - `driver:[name]` - debug a driver with [name]
 * - `db` - debug all repositories
 * - `db:[name]` - debug a repo with [name]
 * - `db:[name]:entity` - debug all entities in the repository
 * - `db:[name]:entity:[name]` - debug entity [name]
 */
export declare type DebugType = '*' | 'connection' | 'driver' | 'driver:[name]' | 'db' | 'db:[name]' | 'db:[name]:entity' | 'db:[name]:entity:[name]';
/**
 * Maps all debug types to all errors types, telling which debug type will throw
 */
export declare type IDebugMap = Partial<{
    [key: string]: boolean | ExceptionType;
}>;
export declare type LogLevel = 'log' | 'debug' | 'warn' | 'error';
export declare abstract class Debug {
    private constructor();
    protected static debugState: 'enabled' | 'disabled' | 'custom';
    /**
     * Contains the map for all debug types and their respective error types for the ORM.
     */
    static readonly map: IDebugMap;
    /**
     * `true` if any debug is enabled
     */
    static readonly isEnabled: boolean;
    /**
     * Shows the current debug state of WebRM
     *
     * - `enabled` - all the logs and exceptions are enabled
     * - `custom` - custom rules are set via a `debug()` function
     * - `disabled` - all the logs and most exceptions are suppressed
     */
    static state: "enabled" | "disabled" | "custom";
    static error(instanceName: string, type: string, message: string): any;
    static error(instanceName: string, type: RegExp, message: string): any;
    static error(instanceName: string, type: DebugType, message: string): any;
    static log(instanceName: string, type: string, message: string): any;
    static log(instanceName: string, type: RegExp, message: string): any;
    static log(instanceName: string, type: DebugType, message: string): any;
    static warn(instanceName: string, type: string, message: string): any;
    static warn(instanceName: string, type: RegExp, message: string): any;
    static warn(instanceName: string, type: DebugType, message: string): any;
    /**
     * Returns the current error type for a specific type of debugging
     */
    static errorType(type: string): boolean | ExceptionType;
    static errorType(type: RegExp): boolean | ExceptionType;
    static errorType(type: DebugType): boolean | ExceptionType;
    static print(instanceName: string, type: any, message: string, level: LogLevel): void;
    private static decoratedLogs;
    static prints(message: string, level?: LogLevel, type?: DebugType): (target: any, key: string, desc: PropertyDescriptor) => void;
}
