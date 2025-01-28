import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: "Create new user" })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: "User created",
        example: {
            id: "id",
            email: "email@email.com",
            token: "Bearer token",
        },
    })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @Post("create")
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }
}
