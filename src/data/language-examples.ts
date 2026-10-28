/** Complete listings reused verbatim by courses and real compiler tests. No user code is executed. */
export interface LanguageExample {language:'Java'|'C'|'C++'|'Go'|'Rust';code:string;stdout:string;args?:string[]}
export const languageExamples:Record<string,LanguageExample>={
 'java-start':{language:'Java',stdout:'15\n',code:`public class Main {
  static int remaining(int total, int spent) {
    if (total < 0 || spent < 0) throw new IllegalArgumentException("Negative minutes");
    return Math.max(0, total - spent);
  }
  public static void main(String[] args) {
    System.out.println(remaining(30, 15));
  }
}
`},
 'java-modelle':{language:'Java',stdout:'SQL:30\ntrue\n',code:`public class Main {
  record Lesson(String title, int minutes) {
    Lesson {
      if (title == null || title.isBlank() || minutes < 0)
        throw new IllegalArgumentException("Invalid lesson");
    }
  }
  public static void main(String[] args) {
    var lesson = new Lesson("SQL", 30);
    System.out.println(lesson.title() + ":" + lesson.minutes());
    System.out.println(lesson.equals(new Lesson("SQL", 30)));
  }
}
`},
 'java-sammlungen':{language:'Java',stdout:'40\n2\n',code:`import java.util.ArrayList;
import java.util.List;
public class Main {
  public static void main(String[] args) {
    List<Integer> minutes = new ArrayList<>(List.of(10, 15, 30));
    minutes.remove(Integer.valueOf(15));
    int total = 0;
    for (int value : minutes) total = Math.addExact(total, value);
    System.out.println(total);
    System.out.println(minutes.size());
  }
}
`},
 'java-fehler':{language:'Java',stdout:'invalid\nclosed=true\n',code:`public class Main {
  static final class Input implements AutoCloseable {
    boolean closed;
    String text() { return "not-a-number"; }
    public void close() { closed = true; }
  }
  public static void main(String[] args) {
    var input = new Input();
    try (input) {
      System.out.println(Integer.parseInt(input.text()));
    } catch (NumberFormatException error) {
      System.out.println("invalid");
    }
    if (!input.closed) throw new AssertionError("Resource leaked");
    System.out.println("closed=" + input.closed);
  }
}
`},
 'java-vertraege':{language:'Java',stdout:'45\n',code:`import java.util.function.Function;
public class Main {
  public static void main(String[] args) {
    Function<String, Integer> minutes = Integer::parseInt;
    var withBreak = minutes.andThen(value -> Math.addExact(value, 30));
    System.out.println(withBreak.apply("15"));
  }
}
`},
 'java-abschluss':{language:'Java',args:['15','30'],stdout:'45\n',code:`public class Main {
  static int total(String[] values) {
    int sum = 0;
    for (String text : values) {
      int value = Integer.parseInt(text);
      if (value < 0) throw new IllegalArgumentException("Negative minutes");
      sum = Math.addExact(sum, value);
    }
    return sum;
  }
  public static void main(String[] args) {
    try { System.out.println(total(args)); }
    catch (IllegalArgumentException | ArithmeticException error) {
      System.err.println("Invalid duration or total outside int range");
      System.exit(2);
    }
  }
}
`},
 'c-cpp-start':{language:'C',stdout:'15\n',code:`#include <stdio.h>
int remaining(int total, int spent) {
  return spent >= total ? 0 : total - spent;
}
int main(void) {
  printf("%d\\n", remaining(30, 15));
  return 0;
}
`},
 'c-cpp-arrays':{language:'C',stdout:'60\n',code:`#include <assert.h>
#include <stddef.h>
#include <stdio.h>
int sum(const int *values, size_t count) {
  int total = 0;
  for (size_t i = 0; i < count; ++i) total += values[i];
  return total;
}
int main(void) {
  const int minutes[] = {10, 20, 30};
  size_t count = sizeof minutes / sizeof minutes[0];
  assert(sum(NULL, 0) == 0);
  printf("%d\\n", sum(minutes, count));
  return 0;
}
`},
 'c-cpp-speicher':{language:'C',stdout:'42\n',code:`#include <stdio.h>
#include <stdlib.h>
int main(void) {
  int *value = malloc(sizeof *value);
  if (value == NULL) return 1;
  *value = 42;
  printf("%d\\n", *value);
  free(value);
  value = NULL;
  return 0;
}
`},
 'c-cpp-raii':{language:'C++',stdout:'42\n',code:`#include <iostream>
#include <memory>
#include <utility>
int main() {
  auto value = std::make_unique<int>(42);
  auto owner = std::move(value);
  if (value || !owner) return 1;
  std::cout << *owner << '\\n';
}
`},
 'c-cpp-container':{language:'C++',stdout:'45\ninvalid index\n',code:`#include <iostream>
#include <stdexcept>
#include <vector>
int main() {
  std::vector<int> minutes{15, 30};
  int sum = 0;
  for (const int value : minutes) sum += value;
  std::cout << sum << '\\n';
  try { std::cout << minutes.at(2); }
  catch (const std::out_of_range&) { std::cout << "invalid index\\n"; }
}
`},
 'c-cpp-abschluss':{language:'C++',args:['15','30'],stdout:'45\n',code:`#include <charconv>
#include <iostream>
#include <limits>
#include <string_view>
int main(int argc, char* argv[]) {
  int total = 0;
  for (int i = 1; i < argc; ++i) {
    const std::string_view text{argv[i]};
    int value = 0;
    const auto [end, error] = std::from_chars(text.data(), text.data() + text.size(), value);
    if (error != std::errc{} || end != text.data() + text.size() || value < 0 ||
        value > std::numeric_limits<int>::max() - total) {
      std::cerr << "Invalid duration or total\\n";
      return 2;
    }
    total += value;
  }
  std::cout << total << '\\n';
}
`},
 'go-start':{language:'Go',stdout:'15\n',code:`package main
import "fmt"
func remaining(total int, spent int) int {
 if spent >= total { return 0 }
 return total - spent
}
func main() { fmt.Println(remaining(30, 15)) }
`},
 'go-daten':{language:'Go',stdout:'[99 20 30]\n[99 7 30]\n',code:`package main
import "fmt"
func main() {
 original := []int{10, 20, 30}
 view := original[:2]
 view[0] = 99
 fmt.Println(original)
 copyOf := append([]int(nil), original...)
 copyOf[1] = 7
 fmt.Println(copyOf)
 if original[1] != 20 { panic("Copy changed original") }
}
`},
 'go-fehler':{language:'Go',stdout:'15\ninvalid\n',code:`package main
import ("fmt"; "strconv")
func minutes(text string) (int, error) {
 value, err := strconv.Atoi(text)
 if err != nil { return 0, err }
 if value < 0 { return 0, fmt.Errorf("negative minutes: %d", value) }
 return value, nil
}
func main() {
 value, err := minutes("15")
 if err != nil { panic(err) }
 fmt.Println(value)
 if _, err := minutes("-1"); err != nil { fmt.Println("invalid") }
}
`},
 'go-nebenlaeufig':{language:'Go',stdout:'45\n',code:`package main
import "fmt"
func main() {
 values := make(chan int)
 go func() {
  defer close(values)
  for _, value := range []int{15, 30} { values <- value }
 }()
 total := 0
 for value := range values { total += value }
 fmt.Println(total)
}
`},
 'go-tests':{language:'Go',stdout:'3 cases passed\n',code:`package main
import "fmt"
func remaining(total, spent int) int {
 if spent >= total { return 0 }
 return total - spent
}
func main() {
 cases := []struct{total, spent, want int}{{30, 15, 15}, {30, 30, 0}, {30, 45, 0}}
 for _, tc := range cases {
  if got := remaining(tc.total, tc.spent); got != tc.want { panic(fmt.Sprintf("got %d, want %d", got, tc.want)) }
 }
 fmt.Println("3 cases passed")
}
`},
 'go-abschluss':{language:'Go',args:['15','30'],stdout:'45\n',code:`package main
import ("fmt"; "math"; "os"; "strconv")
func total(values []string) (int64, error) {
 var sum int64
 for _, text := range values {
  value, err := strconv.ParseInt(text, 10, 64)
  if err != nil || value < 0 || value > math.MaxInt64 - sum { return 0, fmt.Errorf("invalid duration or total") }
  sum += value
 }
 return sum, nil
}
func main() {
 sum, err := total(os.Args[1:])
 if err != nil { fmt.Fprintln(os.Stderr, err); os.Exit(2) }
 fmt.Println(sum)
}
`},
 'rust-start':{language:'Rust',stdout:'SQL\nSQL\n',code:`fn main() {
    let first = String::from("SQL");
    let owner = first;
    println!("{owner}");
    let copy = owner.clone();
    println!("{copy}");
}
`},
 'rust-borgen':{language:'Rust',stdout:'SQL!\n4\n',code:`fn decorate(text: &mut String) { text.push('!'); }
fn byte_count(text: &str) -> usize { text.len() }
fn main() {
    let mut title = String::from("SQL");
    decorate(&mut title);
    let count = byte_count(&title);
    println!("{title}");
    println!("{count}");
}
`},
 'rust-daten':{language:'Rust',stdout:'15\nmissing\n',code:`fn first(values: &[u32]) -> Option<u32> { values.first().copied() }
fn main() {
    match first(&[15, 30]) {
        Some(value) => println!("{value}"),
        None => println!("missing"),
    }
    if first(&[]).is_none() { println!("missing"); }
}
`},
 'rust-fehler':{language:'Rust',stdout:'15\ninvalid\n',code:`fn minutes(text: &str) -> Result<u32, std::num::ParseIntError> { text.parse() }
fn main() {
    match minutes("15") {
        Ok(value) => println!("{value}"),
        Err(error) => eprintln!("{error}"),
    }
    if minutes("-1").is_err() { println!("invalid"); }
}
`},
 'rust-traits':{language:'Rust',stdout:'45\n',code:`trait Timed { fn minutes(&self) -> u32; }
struct Lesson { duration: u32 }
impl Timed for Lesson { fn minutes(&self) -> u32 { self.duration } }
fn total<T: Timed>(items: &[T]) -> u32 { items.iter().map(Timed::minutes).sum() }
fn main() {
    let lessons = [Lesson { duration: 15 }, Lesson { duration: 30 }];
    assert_eq!(total(&lessons), 45);
    assert_eq!(total::<Lesson>(&[]), 0);
    println!("{}", total(&lessons));
}
`},
 'rust-abschluss':{language:'Rust',args:['15','30'],stdout:'45\n',code:`fn total(values: &[String]) -> Result<u64, String> {
    let mut sum = 0_u64;
    for text in values {
        let value: u64 = text.parse().map_err(|_| format!("Invalid duration: {text}"))?;
        sum = sum.checked_add(value).ok_or("Total outside u64 range")?;
    }
    Ok(sum)
}
fn main() {
    let values: Vec<String> = std::env::args().skip(1).collect();
    match total(&values) {
        Ok(sum) => println!("{sum}"),
        Err(error) => { eprintln!("{error}"); std::process::exit(2); }
    }
}
`},
};
