import com.codeborne.selenide.Condition;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static com.codeborne.selenide.Selenide.*;

public class TestEx2 {
    //1. Проверка фильтрации (Без лука + вегитарианская = сырная)
    @Test
    public void TestFoxPizza1() {
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--vegan']").click();
        $x("//div[@class='filter__item filter__item--no-onion']").click();
        $x("//a[@href='/syrnaya/']").shouldBe(Condition.visible);
    }

    //2. Открытие вкладки "Доставка пиццы"
    @Test
    public void TestFoxPizza2() throws Exception {
        var driver = new ChromeDriver();

        open("https://fox-pizza.ru/");
        $x("//a[@href='/delivery/']").click();
        var url = driver.getCurrentUrl();
        var expectedUrl = "https://fox-pizza.ru/delivery/";
        if(url.equals(expectedUrl)) throw new Exception("");
        driver.close();
    }

    //3. Выбор района доставки
    @Test
    public void TestFoxPizza3() throws Exception {
        var driver = new ChromeDriver();
        var address = "г Иркутск, ул Мира, д 42 ";
        driver.get("https://fox-pizza.ru/delivery/");
        var input = driver.findElement(By.xpath("//input[@id='map-search']"));
        input.sendKeys(address);

        sleep(3000);
        input.sendKeys(Keys.ENTER);
        sleep(3000);

        var failed = true;
        var info = driver.findElements(By.tagName("p"));
        for (var tag : info) {
            if (tag.getText().contains("Иркутск II")) {
                failed = false;
            }
        }
        if (failed) {
            driver.close();
            throw new Exception();
        }
        driver.close();
    }

    //4. Открытие вкладки "Акции"
    @Test
    public void TestFoxPizza4() throws Exception {
        var driver = new ChromeDriver();
        var url = "https://fox-pizza.ru/actions/";
        driver.get("https://fox-pizza.ru");
        driver.findElement(By.xpath("//a[@href='/actions/']")).click();
        var currentUrl = driver.getCurrentUrl();
        if(!currentUrl.equals(url)){
            driver.close();
            throw new Exception();
        }
        driver.close();
    }

    //5. Открытие вкладки "Бонусы"
    @Test
    public void TestFoxPizza5() throws Exception {
        var driver = new ChromeDriver();
        var url = "https://fox-pizza.ru/lp/bonus/";
        driver.get("https://fox-pizza.ru");
        driver.findElement(By.xpath("//a[@href='/lp/bonus/']")).click();
        var currentUrl = driver.getCurrentUrl();
        if(!currentUrl.equals(url)){
            driver.close();
            throw new Exception();
        }
        driver.close();
    }

    //6. Открытие корзины без товаров
    @Test
    public void TestFoxPizza6() throws Exception {
        var driver = new ChromeDriver();
        driver.get("https://fox-pizza.ru");
        driver.findElement(By.xpath("//a[@class='btn profile__btn-carts profile__btn-carts--hide-tm btn--small btn--aw']")).click();
        var h1 = driver.findElement(By.className("page__section")).findElement(By.tagName("h1"));
        if(!h1.isDisplayed() && !h1.getText().contains("Ваша корзина пуста")){
            driver.close();
            throw new Exception();
        }
        driver.close();
    }

        //7. Добавить пиццу (Супер хот-дог) в корзину
    @Test
    public void TestFoxPizza7() throws Exception {
        var driver = new ChromeDriver();
        driver.get("https://fox-pizza.ru");
        driver.findElement(By.id("bx_3966226736_591115_362ce596257894d11ab5c1d73d13c755"))
                .findElement(By.cssSelector(".form__cell.form__cell--submit"))
                .findElement(By.tagName("button")).click();
        sleep(3000);
        driver.close();
    }

    //8. Проверка фильтра "Острая"
    @Test
    public void TestFoxPizza8() throws Exception{
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--hot']").click();
        $x("//a[@href='/tom_yam/']").shouldBe(Condition.visible);
    }

    //9. Проверка фильтра "Мясная"
    @Test
    public void TestFoxPizza9() throws Exception{
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--meat']").click();
        $x("//a[@href='/pepperoni_i_tomaty/']").shouldBe(Condition.visible);
    }
    //10. Проверка фильтра "Морепродукты"
    @Test
    public void TestFoxPizza10() throws Exception{
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--sea']").click();
        $x("//a[@href='/tom_yam/']").shouldBe(Condition.visible);
    }
    //11. Проверка фильтра "Вегатарианская"
    @Test
    public void TestFoxPizza11() throws Exception{
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--vegan']").click();
        $x("//a[@href='/syrnaya/']").shouldBe(Condition.visible);
    }
    //12. Проверка фильтра "Без свинины"
    @Test
    public void TestFoxPizza12() throws Exception{
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--no-bacon']").click();
        $x("//a[@href='/syrnaya/']").shouldBe(Condition.visible);
    }
    //13. Проверка фильтра "Без лука"
    @Test
    public void TestFoxPizza13() throws Exception{
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--no-onion']").click();
        $x("//a[@href='/syrnaya/']").shouldBe(Condition.visible);
    }
    //14. Проверка фильтра "Новинка"
    @Test
    public void TestFoxPizza14() throws Exception{
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--new']").click();
        $x("//a[@href='/super_khot_dog/']").shouldBe(Condition.visible);
    }

    //15. Проверка фильтра "Хит"
    @Test
    public void TestFoxPizza15() throws Exception{
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--hit']").click();
        $x("//a[@href='/pepperoni/']").shouldBe(Condition.visible);
    }

    //16. Проверка фильтра "Суперцена"
    @Test
    public void TestFoxPizza16() throws Exception{
        open("https://fox-pizza.ru/");
        $x("//div[@class='filter__item filter__item--superprice']").click();
        $x("//a[@href='/syrnaya/']").shouldBe(Condition.visible);
    }

    //17. Проверка переключения размера пиццы
    @Test
    public void TestFoxPizza17() throws Exception{
        var driver = new ChromeDriver();
        driver.get("https://fox-pizza.ru");

        driver.findElement(By.xpath("//div[@class='filter__item filter__item--hit']")).click();
        sleep(2000);
        var pizza = driver.findElement(By.id("bx_3966226736_2474_a2ea0b94ce937d3a14da723ba41668ae"));
        pizza.findElement(By.tagName("button")).click();
        sleep(2000);
        var sizes = pizza.findElements(By.cssSelector(".form__label-text.js--opts-text"));
        for (var size: sizes) {
            if(size.getText().contains("30 см")){
                size.click();
                break;
            }
        }
        sleep(2000);
        pizza.findElement(By.tagName("button")).click();

        driver.findElement(By.xpath("//a[@class='btn profile__btn-carts profile__btn-carts--hide-tm btn--small btn--aw']")).click();
        sleep(2000);
        var cartItems = driver.findElements(By.className("cart__item"));
        var isDone = false;
        for (var cartItem: cartItems) {
            var name = cartItem.findElement(By.className("cart__item-title"));
            if(name.getText().contains("Пепперони 30 (Традиционное тесто)")){
                isDone = true;
            }
        }
        sleep(2000);
        if(!isDone){
            driver.close();
            throw new Exception();
        }

        driver.close();
    }

    //18. Проверка переключения теста пиццы
    @Test
    public void TestFoxPizza18() throws Exception{
        var driver = new ChromeDriver();
        driver.get("https://fox-pizza.ru");

        driver.findElement(By.xpath("//div[@class='filter__item filter__item--hit']")).click();
        var pizza = driver.findElement(By.id("bx_3966226736_2474_a2ea0b94ce937d3a14da723ba41668ae"));
        sleep(2000);
        var sizes = pizza.findElements(By.cssSelector(".form__label-text.js--opts-text"));
        for (var size: sizes) {
            if(size.getText().contains("30 см")){
                size.click();
                break;
            }
        }
        sleep(2000);
        pizza.findElement(By.tagName("button")).click();

        pizza.findElement(By.id("doughLabel_949a0f45-3c30-40cf-b228-05d1db0ca8ed")).click();
        sleep(2000);
        pizza.findElement(By.tagName("button")).click();

        driver.findElement(By.xpath("//a[@class='btn profile__btn-carts profile__btn-carts--hide-tm btn--small btn--aw']")).click();
        sleep(2000);
        var cartItems = driver.findElements(By.className("cart__item"));
        sleep(2000);
        var isDone = false;
        for (var cartItem: cartItems) {
            var name = cartItem.findElement(By.className("cart__item-title"));
            if(name.getText().contains("Пепперони 30 (Тонкое тесто)")){
                isDone = true;
            }
        }

        if(!isDone){
            driver.close();
            throw new Exception();
        }

        driver.close();
    }

    //19. Удаление из корзины
    @Test
    public void TestFoxPizza19() throws Exception{
        var driver = new ChromeDriver();
        driver.get("https://fox-pizza.ru");

        driver.findElement(By.xpath("//div[@class='filter__item filter__item--hit']")).click();
        var pizza = driver.findElement(By.id("bx_3966226736_2474_a2ea0b94ce937d3a14da723ba41668ae"));
        pizza.findElement(By.tagName("button")).click();

        driver.findElement(By.xpath("//a[@class='btn profile__btn-carts profile__btn-carts--hide-tm btn--small btn--aw']")).click();

        var cartItems = driver.findElements(By.className("cart__item"));
        var isDone = false;
        for (var cartItem: cartItems) {
            cartItem.findElement(By.className("cart__delete")).click();
        }

        var h1 = driver.findElement(By.className("page__section")).findElement(By.tagName("h1"));

        if(!h1.isDisplayed() && !h1.getText().contains("Ваша корзина пуста")){
            driver.close();
            throw new Exception();
        }

        driver.close();
    }

    //20. Включение ночного режима
    @Test
    public void TestFoxPizza20() throws Exception{
        var driver = new ChromeDriver();
        driver.get("https://fox-pizza.ru");

        var button = driver.findElement(By.cssSelector(".theme-switcher__icon.theme-switcher__icon--night"));
        button.click();

        var body = driver.findElement(By.tagName("body"));
        if(!body.getAttribute("class").contains("page--night")){
            driver.close();
            throw new Exception();
        }
        driver.close();
    }
}
