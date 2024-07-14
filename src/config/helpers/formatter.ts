export class Formatter {
  public static currency( val: number ): string{
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val)
  }
}