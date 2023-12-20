import com.codeborne.selenide.Condition;
import org.junit.Test;

import static com.codeborne.selenide.Selenide.*;

public class TestEx1 {
    @Test
    public void TestGoogle() {
        open("https://www.google.com/");
        $x("//textarea[@name='q']").setValue("Веселов Михаил Константинович").pressEnter();
        $x("//div[@id ='result-stats']").shouldBe(Condition.visible);
        sleep(2000);
    }
}
