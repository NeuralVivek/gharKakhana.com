
import java.util.Arrays;
class Solution {

    public int solve( int n,int[] t){
        if(n<=1){
            return n;

        }
        if(t[n]!=-1){
            return t[n];
        }
        return solve(n-1,t) + solve(n-2,t);
    }
   
    public int fib(int n) {
        if(n<=1){
            return n;
        }
         int[] t = new int[31];
         Arrays.fill(t, -1);
         return solve(n,t);
         
       
        
    }
  
   
}