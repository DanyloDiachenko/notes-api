import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DB_HOST"),
                port: Number(configService.get("DB_PORT")),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_NAME"),
                synchronize: true,
                autoLoadEntities: true,
                entities: [
                    UserEntity,
                    /* CategoryEntity,
                    ProductEntity,
                    ProductEntity,
                    AddressEntity,
                    FavoriteEntity,
                    UserEntity,
                    OrderEntity,
                    ReviewEntity,
                    ColorEntity,
                    BrandEntity,
                    SizeEntity, */
                ],
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        /* CategoriesModule,
        ProductsModule,
        BrandsModule,
        UsersModule,
        AddressesModule,
        AuthModule,
        FavoritesModule,
        OrdersModule,
        ReviewsModule,
        ColorsModule,
        SizesModule, */
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
